import { NextRequest, NextResponse } from 'next/server';
import { knowledgeBase, auraContext, auraSystemPrompt } from '@/lib/aura';
import OpenAI from 'openai';

// Función para calcular similitud simple por palabras clave
function calculateMatchScore(question: string, entry: { keywords: string[]; variations?: string[] }): number {
  const questionLower = question.toLowerCase();
  const questionWords = questionLower.split(/\s+/);

  let score = 0;

  for (const keyword of entry.keywords) {
    if (questionLower.includes(keyword.toLowerCase())) {
      score += 2;
    }
    for (const word of questionWords) {
      if (word === keyword.toLowerCase()) {
        score += 3;
      }
    }
  }

  if (entry.variations) {
    for (const variation of entry.variations) {
      const variationLower = variation.toLowerCase();
      if (questionLower.includes(variationLower) || variationLower.includes(questionLower)) {
        score += 5;
      }
      const variationWords = variationLower.split(/\s+/);
      let matchingWords = 0;
      for (const word of questionWords) {
        if (variationWords.some(vw => vw.includes(word) || word.includes(vw))) {
          matchingWords++;
        }
      }
      if (matchingWords >= questionWords.length * 0.5) {
        score += 3;
      }
    }
  }

  return score;
}

function findBestMatch(question: string): { entry: typeof knowledgeBase[0]; score: number } | null {
  let bestMatch: { entry: typeof knowledgeBase[0]; score: number } | null = null;

  for (const entry of knowledgeBase) {
    const score = calculateMatchScore(question, entry);
    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { entry, score };
    }
  }

  if (bestMatch && bestMatch.score >= 3) {
    return bestMatch;
  }

  return null;
}

function isGreeting(message: string): boolean {
  const greetings = ['hola', 'buenos dias', 'buenas', 'hey', 'hi', 'hello', 'que tal', 'qué tal', 'saludos'];
  const lowerMessage = message.toLowerCase().trim();
  return greetings.some(g => lowerMessage === g || lowerMessage.startsWith(g + ' ') || lowerMessage.startsWith(g + ',') || lowerMessage.startsWith(g + '!'));
}

function getGreetingResponse(): string {
  const greetings = [
    "¡Hola! 👋 Soy Aura, la asistente de Mauricio. Estoy aquí para contarte sobre su trayectoria profesional. ¿Qué te gustaría saber?",
    "¡Hola! Me alegra que estés aquí. Puedo contarte sobre la experiencia, proyectos y habilidades de Mauricio. ¿Por dónde quieres empezar?",
    "¡Hey! 👋 Bienvenido a esta presentación interactiva. Soy Aura y conozco cada detalle de la trayectoria de Mauricio. ¿Qué te interesa saber?"
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
}

function isThanks(message: string): boolean {
  const thanks = ['gracias', 'thank', 'genial', 'excelente', 'perfecto', 'muy bien', 'genia', 'crack'];
  const lowerMessage = message.toLowerCase();
  return thanks.some(t => lowerMessage.includes(t));
}

function getThanksResponse(): string {
  const responses = [
    "¡Con gusto! 😊 ¿Hay algo más que quieras saber sobre Mauricio?",
    "¡Me alegra poder ayudarte! Tengo mucha más información si te interesa. ¿Qué más te gustaría saber?",
    "¡Gracias a ti por visitar! Si tienes más preguntas, aquí estaré. ✨"
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

// Obtener cliente OpenAI dinámicamente
function getOpenAIClient(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!apiKey) {
    console.warn('OpenAI API key no configurada');
    return null;
  }
  return new OpenAI({ apiKey });
}

// Generar respuesta con OpenAI
async function generateAIResponse(question: string): Promise<string> {
  const openai = getOpenAIClient();

  // Si no hay OpenAI, usar respuestas predefinidas
  if (!openai) {
    console.log('Usando respuestas de fallback (sin OpenAI)');
    return getFallbackResponse(question);
  }

  try {
    const contextInfo = `
INFORMACIÓN DEL PROFESIONAL:
- Nombre: ${auraContext.professional.name}
- Título: ${auraContext.professional.title}
- Años de experiencia: ${auraContext.professional.yearsExperience}
- Especialidad: ${auraContext.professional.mainRole}
- Ubicación: ${auraContext.contact.location}

CONTACTO (IMPORTANTE - usa estos datos reales cuando pregunten por contacto):
- WhatsApp: ${auraContext.contact.whatsapp}
- Email: ${auraContext.contact.email}
- LinkedIn: ${auraContext.contact.linkedin}
- GitHub: ${auraContext.contact.github}

PROYECTOS DESTACADOS:
${auraContext.projectsOverview}
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `${auraSystemPrompt}

${contextInfo}`
        },
        {
          role: 'user',
          content: question
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return response.choices[0]?.message?.content || 'Lo siento, no pude procesar tu pregunta. ¿Podrías formularla de otra manera?';

  } catch (error) {
    console.error('Error generando respuesta con OpenAI:', error);
    return getFallbackResponse(question);
  }
}

// Respuestas de fallback cuando no hay OpenAI
function getFallbackResponse(question: string): string {
  const questionLower = question.toLowerCase();

  if (questionLower.includes('contacto') || questionLower.includes('whatsapp') || questionLower.includes('email') || questionLower.includes('linkedin') || questionLower.includes('llamar') || questionLower.includes('escribir') || questionLower.includes('comunicar')) {
    return `¡Claro! Puedes contactar a Mauricio directamente:\n\n📱 WhatsApp: ${auraContext.contact.whatsapp}\n💼 LinkedIn: ${auraContext.contact.linkedin}\n📧 Email: ${auraContext.contact.email}\n💻 GitHub: ${auraContext.contact.github}\n\n¿Hay algo más que quieras saber?`;
  }

  if (questionLower.includes('experiencia') || questionLower.includes('años')) {
    return `${auraContext.professional.name} tiene más de ${auraContext.professional.yearsExperience} años de experiencia en tecnología. Su especialidad principal es ${auraContext.professional.mainRole}. ¿Quieres saber sobre algún proyecto específico?`;
  }

  if (questionLower.includes('proyecto')) {
    return `Mauricio ha trabajado en muchos proyectos interesantes como NEXUS AIOps, AeroRisk, MarketVision, MokesAgro y más. Cada uno representa una etapa diferente de su evolución profesional. ¿Te gustaría conocer detalles de alguno en particular?`;
  }

  if (questionLower.includes('tecnologia') || questionLower.includes('tecnologías') || questionLower.includes('sabe') || questionLower.includes('conoce')) {
    return `Mauricio domina tecnologías como Python, FastAPI, AWS, Azure, BigQuery, Spark, React, TypeScript, PostgreSQL, Docker, Kubernetes y muchas más. Su especialidad es backend e ingeniería de datos. ¿Quieres saber sobre alguna tecnología específica?`;
  }

  return `Gracias por tu pregunta. ${auraContext.professional.name} es un ${auraContext.professional.title} con más de ${auraContext.professional.yearsExperience} años de experiencia. Si quieres saber algo específico sobre sus proyectos, habilidades o experiencia, ¡pregúntame! También puedes contactarlo directamente al WhatsApp: ${auraContext.contact.whatsapp}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Mensaje requerido' },
        { status: 400 }
      );
    }

    const trimmedMessage = message.trim();

    // 1. Detectar saludos
    if (isGreeting(trimmedMessage)) {
      return NextResponse.json({
        response: getGreetingResponse(),
        source: 'greeting'
      });
    }

    // 2. Detectar agradecimientos
    if (isThanks(trimmedMessage)) {
      return NextResponse.json({
        response: getThanksResponse(),
        source: 'thanks'
      });
    }

    // 3. Buscar en la base de conocimiento
    const match = findBestMatch(trimmedMessage);

    if (match) {
      if (match.entry.category === 'contact') {
        const responseWithLinks = `${match.entry.answer}\n\n📱 WhatsApp: ${auraContext.contact.whatsapp}\n💼 LinkedIn: ${auraContext.contact.linkedin}\n📧 Email: ${auraContext.contact.email}\n💻 GitHub: ${auraContext.contact.github}`;
        return NextResponse.json({
          response: responseWithLinks,
          source: 'knowledge',
          matchedQuestion: match.entry.question
        });
      }

      return NextResponse.json({
        response: match.entry.answer,
        source: 'knowledge',
        matchedQuestion: match.entry.question
      });
    }

    // 4. Si no hay match, generar respuesta con OpenAI
    const aiResponse = await generateAIResponse(trimmedMessage);

    return NextResponse.json({
      response: aiResponse,
      source: 'openai'
    });

  } catch (error) {
    console.error('Error en aura-chat:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// Endpoint GET para verificar que funciona
export async function GET() {
  const hasOpenAIKey = !!(process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY);

  return NextResponse.json({
    status: 'ok',
    message: 'Aura Chat API funcionando con OpenAI',
    openaiConfigured: hasOpenAIKey,
    knowledgeBaseSize: knowledgeBase.length,
    contact: {
      whatsapp: auraContext.contact.whatsapp,
      email: auraContext.contact.email
    }
  });
}
