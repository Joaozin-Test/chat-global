let messages = [];

export default function handler(req, res) {
  // Configuração de CORS para o Roblox conseguir acessar
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { user, content, serverId } = req.body;
    
    if (!user || !content) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    const newMessage = {
      user,
      content,
      serverId: serverId || "Global",
      time: Date.now()
    };

    messages.push(newMessage);

    // Mantém apenas as últimas 50 mensagens para não sobrecarregar
    if (messages.length > 50) messages.shift();

    return res.status(201).json(newMessage);
  } 
  
  if (req.method === 'GET') {
    return res.status(200).json(messages);
  }
}
