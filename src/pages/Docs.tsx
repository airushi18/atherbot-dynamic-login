
import React, { useState } from 'react';
import { useLocation, Link, Routes, Route } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, ChevronLeft, ChevronRight, Code, Copy, ExternalLink, Menu } from 'lucide-react';
import { cn } from "@/lib/utils";
import Header from '@/components/Header';
import { useToast } from '@/hooks/use-toast';

// Documentation pages content components
const Introduction = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-atherbot-dark">Introduction</h1>
    <p>Welcome to the Ather Bot API documentation. This guide will help you get started with integrating Ather Bot's powerful AI capabilities into your applications.</p>
    
    <div className="p-4 bg-atherbot-blue/5 border border-atherbot-blue/20 rounded-md">
      <h3 className="text-lg font-medium text-atherbot-dark mb-2">Getting Started</h3>
      <p className="mb-4">To use the Ather Bot API, you'll need an API key. If you don't have one yet, you can generate it in your <Link to="/api" className="text-atherbot-blue hover:underline">API dashboard</Link>.</p>
      
      <h4 className="font-medium text-atherbot-dark mt-4 mb-2">Base URL</h4>
      <div className="bg-black text-white p-3 rounded-md font-mono text-sm overflow-x-auto">
        <pre>https://api.atherbot.com/v1</pre>
      </div>
    </div>
    
    <h2 className="text-2xl font-bold text-atherbot-dark mt-8">Authentication</h2>
    <p>All API requests must include your API key in the Authorization header:</p>
    
    <div className="bg-black text-white p-4 rounded-md font-mono text-sm overflow-x-auto mt-4">
      <pre>{'Authorization: Bearer YOUR_API_KEY'}</pre>
    </div>
    
    <h2 className="text-2xl font-bold text-atherbot-dark mt-8">Rate Limits</h2>
    <p>The API is rate-limited based on your subscription plan. If you exceed your rate limit, the API will return a 429 Too Many Requests response.</p>
    
    <table className="min-w-full mt-4 border-collapse">
      <thead>
        <tr className="bg-gray-50">
          <th className="border p-3 text-left">Plan</th>
          <th className="border p-3 text-left">Requests per minute</th>
          <th className="border p-3 text-left">Tokens per month</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border p-3">Free</td>
          <td className="border p-3">10</td>
          <td className="border p-3">10,000</td>
        </tr>
        <tr>
          <td className="border p-3">Basic</td>
          <td className="border p-3">60</td>
          <td className="border p-3">100,000</td>
        </tr>
        <tr>
          <td className="border p-3">Pro</td>
          <td className="border p-3">120</td>
          <td className="border p-3">1,000,000</td>
        </tr>
        <tr>
          <td className="border p-3">Enterprise</td>
          <td className="border p-3">Custom</td>
          <td className="border p-3">Custom</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const QuickStart = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-atherbot-dark">Quick Start</h1>
    <p>This guide will help you make your first API request to Ather Bot in just a few minutes.</p>
    
    <div className="mt-8 space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-atherbot-dark mb-4">1. Get your API Key</h2>
        <p>Before you can make requests to the Ather Bot API, you need an API key. You can generate one in your <Link to="/api" className="text-atherbot-blue hover:underline">API dashboard</Link>.</p>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold text-atherbot-dark mb-4">2. Make your first request</h2>
        <p className="mb-4">Here's how to make a simple request to generate text using curl:</p>
        
        <div className="bg-black text-white p-4 rounded-md font-mono text-sm overflow-x-auto">
          <pre>{`curl -X POST https://api.atherbot.com/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Tell me about artificial intelligence",
    "max_tokens": 100,
    "temperature": 0.7
  }'`}</pre>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold text-atherbot-dark mb-4">3. Understand the response</h2>
        <p className="mb-4">The API will respond with a JSON object containing the generated text:</p>
        
        <div className="bg-black text-white p-4 rounded-md font-mono text-sm overflow-x-auto">
          <pre>{`{
  "id": "gen-123abc456def",
  "object": "text.generation",
  "created": 1635176422,
  "text": "Artificial intelligence (AI) refers to systems or machines that mimic human intelligence to perform tasks and can iteratively improve themselves based on the information they collect. AI manifests in a number of forms including...",
  "tokens_used": 52,
  "finish_reason": "length"
}`}</pre>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold text-atherbot-dark mb-4">4. Integrate into your application</h2>
        <p>Now you can integrate this API call into your application using any programming language. Check out our code examples for various languages in the next sections.</p>
      </div>
    </div>
  </div>
);

const TextGeneration = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-atherbot-dark">Text Generation</h1>
    <p>The Text Generation API allows you to generate high-quality text based on a prompt.</p>
    
    <h2 className="text-2xl font-bold text-atherbot-dark mt-8">Endpoint</h2>
    <div className="bg-black text-white p-3 rounded-md font-mono text-sm overflow-x-auto">
      <pre>POST https://api.atherbot.com/v1/generate</pre>
    </div>
    
    <h2 className="text-2xl font-bold text-atherbot-dark mt-8">Request Parameters</h2>
    <table className="min-w-full mt-4 border-collapse">
      <thead>
        <tr className="bg-gray-50">
          <th className="border p-3 text-left">Parameter</th>
          <th className="border p-3 text-left">Type</th>
          <th className="border p-3 text-left">Required</th>
          <th className="border p-3 text-left">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border p-3 font-mono">prompt</td>
          <td className="border p-3">string</td>
          <td className="border p-3">Yes</td>
          <td className="border p-3">The prompt to generate text from</td>
        </tr>
        <tr>
          <td className="border p-3 font-mono">max_tokens</td>
          <td className="border p-3">integer</td>
          <td className="border p-3">No</td>
          <td className="border p-3">Maximum number of tokens to generate (default: 100)</td>
        </tr>
        <tr>
          <td className="border p-3 font-mono">temperature</td>
          <td className="border p-3">float</td>
          <td className="border p-3">No</td>
          <td className="border p-3">Controls randomness (0-1, default: 0.7)</td>
        </tr>
        <tr>
          <td className="border p-3 font-mono">stop</td>
          <td className="border p-3">string or array</td>
          <td className="border p-3">No</td>
          <td className="border p-3">Sequences where the API will stop generating</td>
        </tr>
      </tbody>
    </table>
    
    <h2 className="text-2xl font-bold text-atherbot-dark mt-8">Example Request</h2>
    <div className="bg-black text-white p-4 rounded-md font-mono text-sm overflow-x-auto">
      <pre>{`curl -X POST https://api.atherbot.com/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Write a short poem about robots",
    "max_tokens": 150,
    "temperature": 0.8
  }'`}</pre>
    </div>
    
    <h2 className="text-2xl font-bold text-atherbot-dark mt-8">Example Response</h2>
    <div className="bg-black text-white p-4 rounded-md font-mono text-sm overflow-x-auto">
      <pre>{`{
  "id": "gen-456def789ghi",
  "object": "text.generation",
  "created": 1635176983,
  "text": "Silicon hearts, steel minds,\\nWorkers of the future time.\\nMetallic souls with gentle grace,\\nHelping humans set the pace.\\n\\nEyes of sensors, hands precise,\\nCalculations cold as ice.\\nYet within their coded brain,\\nSpark of something more remains.",
  "tokens_used": 61,
  "finish_reason": "stop"
}`}</pre>
    </div>
  </div>
);

const CodeExamples = () => {
  const { toast } = useToast();
  
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: 'Code copied',
      description: 'The code snippet has been copied to your clipboard',
    });
  };
  
  const pythonCode = `import requests

api_key = "YOUR_API_KEY"
url = "https://api.atherbot.com/v1/generate"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

data = {
    "prompt": "Tell me about artificial intelligence",
    "max_tokens": 100,
    "temperature": 0.7
}

response = requests.post(url, headers=headers, json=data)
result = response.json()

print(result["text"])`;

  const javascriptCode = `// Using fetch
const apiKey = "YOUR_API_KEY";
const url = "https://api.atherbot.com/v1/generate";

const data = {
  prompt: "Tell me about artificial intelligence",
  max_tokens: 100,
  temperature: 0.7
};

fetch(url, {
  method: "POST",
  headers: {
    "Authorization": \`Bearer \${apiKey}\`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(result => {
  console.log(result.text);
})
.catch(error => {
  console.error("Error:", error);
});`;

  const nodejsCode = `// Using Node.js with axios
const axios = require('axios');

const apiKey = "YOUR_API_KEY";
const url = "https://api.atherbot.com/v1/generate";

const data = {
  prompt: "Tell me about artificial intelligence",
  max_tokens: 100,
  temperature: 0.7
};

axios.post(url, data, {
  headers: {
    "Authorization": \`Bearer \${apiKey}\`,
    "Content-Type": "application/json"
  }
})
.then(response => {
  console.log(response.data.text);
})
.catch(error => {
  console.error("Error:", error);
});`;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-atherbot-dark">Code Examples</h1>
      <p>Use these code examples to quickly integrate Ather Bot API into your application.</p>
      
      <Tabs defaultValue="python" className="mt-8">
        <TabsList>
          <TabsTrigger value="python">Python</TabsTrigger>
          <TabsTrigger value="javascript">JavaScript</TabsTrigger>
          <TabsTrigger value="nodejs">Node.js</TabsTrigger>
        </TabsList>
        
        <TabsContent value="python" className="relative">
          <div className="absolute top-4 right-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleCopyCode(pythonCode)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="bg-black text-white p-4 rounded-md font-mono text-sm overflow-x-auto">
            <pre>{pythonCode}</pre>
          </div>
        </TabsContent>
        
        <TabsContent value="javascript" className="relative">
          <div className="absolute top-4 right-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleCopyCode(javascriptCode)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="bg-black text-white p-4 rounded-md font-mono text-sm overflow-x-auto">
            <pre>{javascriptCode}</pre>
          </div>
        </TabsContent>
        
        <TabsContent value="nodejs" className="relative">
          <div className="absolute top-4 right-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleCopyCode(nodejsCode)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="bg-black text-white p-4 rounded-md font-mono text-sm overflow-x-auto">
            <pre>{nodejsCode}</pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Playground = () => {
  const [prompt, setPrompt] = useState("Tell me about artificial intelligence");
  const [maxTokens, setMaxTokens] = useState(100);
  const [temperature, setTemperature] = useState(0.7);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResult("Artificial intelligence (AI) refers to systems or machines that mimic human intelligence to perform tasks and can iteratively improve themselves based on the information they collect. AI manifests in a number of forms including chatbots, smart assistants, and autonomous vehicles. The field of AI research began in the 1950s and has made significant progress since then. Today's AI technologies are capable of analyzing vast amounts of data, recognizing patterns, and making predictions with remarkable accuracy.");
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-atherbot-dark">API Playground</h1>
      <p>Try out the Ather Bot API directly from your browser.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div>
          <div className="p-6 border rounded-md bg-white">
            <h2 className="text-lg font-semibold mb-4">Request Parameters</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-atherbot-dark mb-1">
                  Prompt
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full min-h-[100px] p-3 border rounded-md"
                  placeholder="Enter your prompt here..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-atherbot-dark mb-1">
                    Max Tokens
                  </label>
                  <input
                    type="number"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(Number(e.target.value))}
                    className="w-full p-2 border rounded-md"
                    min="1"
                    max="1000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-atherbot-dark mb-1">
                    Temperature
                  </label>
                  <input
                    type="number"
                    value={temperature}
                    onChange={(e) => setTemperature(Number(e.target.value))}
                    className="w-full p-2 border rounded-md"
                    min="0"
                    max="1"
                    step="0.1"
                  />
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Generating..." : "Send Request"}
              </Button>
            </form>
          </div>
        </div>
        
        <div>
          <div className="p-6 border rounded-md bg-white h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Response</h2>
              {result && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigator.clipboard.writeText(result)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md min-h-[300px]">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-atherbot-blue"></div>
                </div>
              ) : (
                <div>{result || "Response will appear here"}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Docs = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const navigation = [
    { name: 'Introduction', path: '/docs', component: Introduction },
    { name: 'Quick Start', path: '/docs/quick-start', component: QuickStart },
    { name: 'Text Generation', path: '/docs/text-generation', component: TextGeneration },
    { name: 'Code Examples', path: '/docs/code-examples', component: CodeExamples },
    { name: 'API Playground', path: '/docs/playground', component: Playground },
  ];
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="flex flex-col md:flex-row pt-16">
        {/* Sidebar */}
        <aside
          className={cn(
            "md:w-64 bg-gray-50 border-r border-gray-200 md:h-[calc(100vh-64px)] md:sticky md:top-16 flex-shrink-0 z-50",
            sidebarOpen ? "fixed inset-y-16 left-0 right-0 md:relative" : "hidden md:block"
          )}
        >
          <div className="p-5">
            <div className="flex items-center mb-6">
              <Book className="h-5 w-5 text-atherbot-blue mr-2" />
              <h3 className="text-lg font-medium">Documentation</h3>
            </div>
            
            <nav className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "block px-3 py-2 rounded-md text-sm transition-colors",
                    location.pathname === item.path
                      ? "bg-atherbot-blue/10 text-atherbot-blue font-medium"
                      : "text-atherbot-gray hover:bg-gray-100 hover:text-atherbot-dark"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </aside>
        
        {/* Mobile sidebar toggle */}
        <div className="md:hidden p-4 border-b sticky top-16 bg-white z-40">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="gap-1"
          >
            <Menu className="h-4 w-4" />
            <span>Menu</span>
          </Button>
        </div>
        
        {/* Main content */}
        <div className="flex-1 p-6 md:p-8 lg:p-10">
          <div className="max-w-4xl mx-auto">
            <Routes>
              <Route path="/" element={<Introduction />} />
              <Route path="/quick-start" element={<QuickStart />} />
              <Route path="/text-generation" element={<TextGeneration />} />
              <Route path="/code-examples" element={<CodeExamples />} />
              <Route path="/playground" element={<Playground />} />
            </Routes>
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Docs;
