
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Bot, Send, User, Key, Loader, Copy } from 'lucide-react';
import { createApiKey, getApiKeys } from '@/services/apiKeyService';

type Message = {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
};

const TryChatbot = () => {
  const { toast } = useToast();
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      content: 'Hi there! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isFetchingKey, setIsFetchingKey] = useState(false);
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  // Check if user already has an API key
  useEffect(() => {
    if (user) {
      fetchApiKey();
    }
  }, [user]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchApiKey = async () => {
    try {
      setIsFetchingKey(true);
      const keys = await getApiKeys();
      if (keys.length > 0) {
        setApiKey(keys[0].key);
      }
    } catch (error) {
      console.error('Error fetching API key:', error);
    } finally {
      setIsFetchingKey(false);
    }
  };

  const handleGetApiKey = async () => {
    if (apiKey) {
      // If the user already has an API key, copy it to clipboard
      navigator.clipboard.writeText(apiKey);
      toast({
        title: 'API key copied',
        description: 'Your API key has been copied to clipboard',
      });
      return;
    }

    try {
      setIsGeneratingKey(true);
      const newKey = await createApiKey('Default API Key');
      setApiKey(newKey.key);
      toast({
        title: 'API key generated',
        description: 'Your API key has been generated successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error generating API key',
        description: error.message || 'An error occurred while generating your API key',
        variant: 'destructive',
      });
    } finally {
      setIsGeneratingKey(false);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response
    try {
      // In a real application, we would call an API here
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      // Sample responses
      const responses = [
        "I understand your question. Based on the information I have, I would say that's correct.",
        "That's an interesting question. Let me provide some more context to help clarify.",
        "I don't have specific information about that in my knowledge base. Would you like me to try a more general answer?",
        "According to the database you've uploaded, the answer is available in section 3.2 of your documentation.",
        "I can help with that! Here's what I found in your uploaded database about this topic.",
      ];
      
      const botMessage: Message = {
        role: 'bot',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get a response. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsTyping(false);
    }
  };

  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div>Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-atherbot-dark mb-2">Try Chatbot</h1>
        <p className="text-atherbot-gray">Test our AI chatbot and get your API key</p>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-5 flex flex-col h-[calc(100vh-240px)]">
          <CardHeader className="pb-4">
            <CardTitle>Chat with AI</CardTitle>
            <CardDescription>
              Ask questions and see how the AI responds based on your uploaded database
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden flex flex-col">
            <ScrollArea className="flex-grow pr-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`flex items-start max-w-[80%] ${
                        message.role === 'user'
                          ? 'bg-atherbot-blue text-white rounded-t-lg rounded-bl-lg'
                          : 'bg-gray-100 text-gray-800 rounded-t-lg rounded-br-lg'
                      } p-3`}
                    >
                      <div className="mr-2 mt-0.5">
                        {message.role === 'user' ? (
                          <User className="h-5 w-5 text-atherbot-blue bg-white rounded-full p-1" />
                        ) : (
                          <Bot className="h-5 w-5 text-atherbot-blue" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm">{message.content}</div>
                        <div className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 rounded-lg p-3 flex items-center">
                      <Bot className="h-5 w-5 text-atherbot-blue mr-2" />
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="pt-0">
            <form onSubmit={handleSendMessage} className="w-full flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isTyping}
                className="flex-grow"
              />
              <Button type="submit" disabled={isTyping || !input.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>API Access</CardTitle>
            <CardDescription>
              Get your API key to integrate with your applications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <Key className="h-4 w-4 mr-1 text-atherbot-blue" />
                Your API Key
              </h3>
              {isFetchingKey ? (
                <div className="flex items-center justify-center py-2">
                  <Loader className="h-5 w-5 animate-spin text-atherbot-blue" />
                </div>
              ) : apiKey ? (
                <div className="flex items-center">
                  <div className="bg-gray-100 text-sm font-mono rounded px-2 py-1 flex-grow truncate">
                    {apiKey.substring(0, 8)}...{apiKey.substring(apiKey.length - 4)}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2"
                    onClick={() => {
                      navigator.clipboard.writeText(apiKey);
                      toast({
                        title: 'Copied',
                        description: 'API key copied to clipboard',
                      });
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-gray-600">No API key generated yet</p>
              )}
            </div>

            <Button
              className="w-full"
              onClick={handleGetApiKey}
              disabled={isGeneratingKey}
            >
              {isGeneratingKey ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : apiKey ? (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy API Key
                </>
              ) : (
                <>
                  <Key className="h-4 w-4 mr-2" />
                  Get API Key
                </>
              )}
            </Button>

            <div className="text-xs text-gray-500 space-y-2">
              <p>Your API key grants access to all of our API endpoints.</p>
              <p>Keep your API key secure and never share it publicly.</p>
              {apiKey && (
                <p className="font-medium text-atherbot-blue">
                  You now have access to the Ather Bot API!
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-7">
          <CardHeader>
            <CardTitle>API Integration</CardTitle>
            <CardDescription>
              How to integrate the chatbot into your applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Example API Request</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                  <pre className="text-sm">
{`curl -X POST https://api.atherbot.com/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "Tell me about your features", "max_tokens": 150}'`}
                  </pre>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">JavaScript</h3>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto h-40">
                    <pre className="text-sm">
{`const response = await fetch(
  'https://api.atherbot.com/v1/chat/completions',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: "Tell me about your features",
      max_tokens: 150
    })
  }
);

const data = await response.json();
console.log(data.choices[0].text);`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Python</h3>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto h-40">
                    <pre className="text-sm">
{`import requests

response = requests.post(
  'https://api.atherbot.com/v1/chat/completions',
  headers={
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  json={
    'prompt': "Tell me about your features",
    'max_tokens': 150
  }
)

data = response.json()
print(data['choices'][0]['text'])`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TryChatbot;
