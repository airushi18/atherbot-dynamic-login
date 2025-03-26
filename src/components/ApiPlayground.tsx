
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Play, Code, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ApiPlayground = () => {
  const { toast } = useToast();
  const [endpoint, setEndpoint] = useState('/api/v1/chat/completions');
  const [method, setMethod] = useState('POST');
  const [apiKey, setApiKey] = useState('');
  const [requestBody, setRequestBody] = useState(JSON.stringify({
    prompt: "Tell me about artificial intelligence",
    max_tokens: 150
  }, null, 2));
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSendRequest = async () => {
    if (!apiKey) {
      toast({
        title: 'API key required',
        description: 'Please enter an API key to test the request',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    setResponse('');
    
    try {
      // This is just a simulated response for the playground
      // In a real app, you would make an actual API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const simulatedResponse = {
        id: 'resp_' + Math.random().toString(36).substring(2, 10),
        created: new Date().toISOString(),
        model: 'atherbot-1',
        choices: [
          {
            text: "Artificial intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn like humans. AI encompasses various technologies including machine learning, natural language processing, computer vision, and more. These systems can perform tasks that typically require human intelligence such as visual perception, speech recognition, decision-making, and language translation.",
            finish_reason: "length"
          }
        ],
        usage: {
          prompt_tokens: 5,
          completion_tokens: 75,
          total_tokens: 80
        }
      };
      
      setResponse(JSON.stringify(simulatedResponse, null, 2));
      
      toast({
        title: 'Request successful',
        description: 'The API request was processed successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Request failed',
        description: error.message || 'There was an error processing your request',
        variant: 'destructive',
      });
      setResponse(JSON.stringify({
        error: {
          message: error.message || 'Unknown error occurred',
          type: 'api_error'
        }
      }, null, 2));
    } finally {
      setIsLoading(false);
    }
  };
  
  const copyResponseToClipboard = () => {
    navigator.clipboard.writeText(response);
    toast({
      title: 'Copied to clipboard',
      description: 'The response has been copied to your clipboard',
    });
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>API Playground</CardTitle>
        <CardDescription>
          Test your API requests and see the responses in real-time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="request" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="request">Request</TabsTrigger>
            <TabsTrigger value="code">Code Examples</TabsTrigger>
          </TabsList>
          
          <TabsContent value="request" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="method">Method</Label>
                <Select value={method} onValueChange={setMethod}>
                  <SelectTrigger id="method">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="endpoint">Endpoint</Label>
                <Input 
                  id="endpoint" 
                  value={endpoint} 
                  onChange={(e) => setEndpoint(e.target.value)} 
                  placeholder="/api/v1/endpoint"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="apiKey">API Key</Label>
              <Input 
                id="apiKey" 
                value={apiKey} 
                onChange={(e) => setApiKey(e.target.value)} 
                placeholder="Enter your API key"
                type="password"
              />
            </div>
            
            <div>
              <Label htmlFor="requestBody">Request Body</Label>
              <Textarea 
                id="requestBody" 
                value={requestBody} 
                onChange={(e) => setRequestBody(e.target.value)} 
                placeholder="{}"
                className="min-h-[200px] font-mono"
              />
            </div>
            
            <Button 
              onClick={handleSendRequest} 
              className="w-full"
              disabled={isLoading}
            >
              <Play className="mr-2 h-4 w-4" />
              {isLoading ? 'Sending...' : 'Send Request'}
            </Button>
            
            {response && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <Label>Response</Label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={copyResponseToClipboard}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                </div>
                <div className="p-4 bg-gray-50 rounded-md overflow-auto">
                  <pre className="text-sm font-mono whitespace-pre-wrap">
                    {response}
                  </pre>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="code">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">cURL</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                  <pre className="text-sm">
{`curl -X POST https://api.atherbot.com${endpoint} \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '${requestBody.replace(/\n/g, '\n  ')}'`}
                  </pre>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">JavaScript</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                  <pre className="text-sm">
{`const response = await fetch('https://api.atherbot.com${endpoint}', {
  method: '${method}',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: ${method === 'GET' ? 'undefined' : `JSON.stringify(${requestBody})`}
});

const data = await response.json();
console.log(data);`}
                  </pre>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Python</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                  <pre className="text-sm">
{`import requests

response = requests.${method.toLowerCase()}(
  'https://api.atherbot.com${endpoint}',
  headers={
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  json=${method === 'GET' ? 'None' : requestBody}
)

print(response.json())`}
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ApiPlayground;
