
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertCircle, Check, Copy, ExternalLink, Info, Key, Plus, Trash } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { useToast } from '@/hooks/use-toast';

const ApiPage = () => {
  const { toast } = useToast();
  const [showNewKeyDialog, setShowNewKeyDialog] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  
  // Dummy data
  const apiKeys = [
    { id: 1, name: 'Production Key', key: 'ather_prod_1234567890abcdef1234567890', createdAt: '2023-05-15', lastUsed: '2023-10-25' },
    { id: 2, name: 'Development Key', key: 'ather_dev_0987654321abcdef0987654321', createdAt: '2023-06-01', lastUsed: '2023-10-20' },
    { id: 3, name: 'Testing Key', key: 'ather_test_abcdef1234567890abcdef1234', createdAt: '2023-08-15', lastUsed: '2023-09-30' },
  ];
  
  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({
      title: 'API key copied',
      description: 'The API key has been copied to your clipboard',
    });
  };
  
  const handleCreateKey = () => {
    if (!newKeyName) {
      toast({
        title: 'Please provide a name',
        description: 'You need to provide a name for your API key',
        variant: 'destructive',
      });
      return;
    }
    
    toast({
      title: 'API key created',
      description: 'Your new API key has been generated successfully',
    });
    
    setShowNewKeyDialog(false);
    setNewKeyName('');
  };
  
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-atherbot-dark mb-2">API Management</h1>
        <p className="text-atherbot-gray">Manage your API keys and integrations</p>
      </div>
      
      <Tabs defaultValue="keys" className="mb-8">
        <TabsList>
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="usage">Usage & Limits</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="keys" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Your API Keys</CardTitle>
                  <CardDescription>
                    Manage your API keys for accessing the Ather Bot API
                  </CardDescription>
                </div>
                <Dialog open={showNewKeyDialog} onOpenChange={setShowNewKeyDialog}>
                  <DialogTrigger asChild>
                    <Button className="gap-1">
                      <Plus className="h-4 w-4" />
                      Generate New Key
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New API Key</DialogTitle>
                      <DialogDescription>
                        Give your API key a name to help you identify it later.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Label htmlFor="keyName">API Key Name</Label>
                      <Input 
                        id="keyName" 
                        value={newKeyName} 
                        onChange={(e) => setNewKeyName(e.target.value)} 
                        placeholder="e.g. Production, Development, etc."
                        className="mt-2"
                      />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowNewKeyDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateKey}>
                        Generate Key
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiKeys.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <Key className="h-4 w-4 text-atherbot-blue" />
                        <span className="font-medium text-atherbot-dark">{item.name}</span>
                      </div>
                      <div className="text-sm text-atherbot-gray mt-1">
                        Created on {item.createdAt} • Last used {item.lastUsed}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1.5 bg-atherbot-muted rounded-md font-mono text-sm">
                        {`${item.key.substring(0, 10)}...${item.key.substring(item.key.length - 4)}`}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleCopyKey(item.key)}
                        title="Copy API Key"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        title="Delete API Key"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4 text-sm text-atherbot-gray">
              <div className="flex items-center gap-1">
                <Info className="h-4 w-4" />
                <span>Keep your API keys secure and never share them publicly</span>
              </div>
              <Button variant="link" className="p-0 h-auto gap-1 text-atherbot-blue">
                <span>Read API Docs</span>
                <ExternalLink className="h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
              <CardDescription>
                Quick reference on how to use the Ather Bot API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 border rounded-md bg-gray-50">
                  <div className="font-medium mb-2">Authentication</div>
                  <div className="text-sm text-atherbot-gray mb-3">
                    All API requests must include your API key in the headers:
                  </div>
                  <div className="bg-black text-white p-3 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>{'Authorization: Bearer YOUR_API_KEY'}</pre>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md bg-gray-50">
                  <div className="font-medium mb-2">Example Request</div>
                  <div className="text-sm text-atherbot-gray mb-3">
                    Here's a basic example of how to make a request to the Ather Bot API:
                  </div>
                  <div className="bg-black text-white p-3 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>{`curl -X POST https://api.atherbot.com/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "Tell me about artificial intelligence"}'`}</pre>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  <span>For comprehensive documentation and examples, please visit our</span>
                  <a href="/docs" className="text-atherbot-blue hover:underline">API Documentation</a>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle>API Usage & Limits</CardTitle>
              <CardDescription>
                Monitor your API usage and view your current limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="font-medium">Current Month Usage</div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg bg-white">
                      <div className="text-sm text-atherbot-gray mb-1">Total Requests</div>
                      <div className="text-2xl font-semibold">12,458</div>
                      <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                        <Check className="h-3 w-3" />
                        <span>Within limit</span>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-white">
                      <div className="text-sm text-atherbot-gray mb-1">Total Tokens</div>
                      <div className="text-2xl font-semibold">256,789</div>
                      <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                        <Check className="h-3 w-3" />
                        <span>Within limit</span>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg bg-white">
                      <div className="text-sm text-atherbot-gray mb-1">Average Response Time</div>
                      <div className="text-2xl font-semibold">245ms</div>
                      <div className="text-xs text-atherbot-gray mt-1">
                        <span>Last 24 hours</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="font-medium mb-4">Your Plan Limits</div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded-lg">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="px-6 py-3 text-left text-xs font-medium text-atherbot-gray uppercase tracking-wider">Resource</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-atherbot-gray uppercase tracking-wider">Limit</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-atherbot-gray uppercase tracking-wider">Used</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-atherbot-gray uppercase tracking-wider">Remaining</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-atherbot-dark">API Requests</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-atherbot-dark">100,000 / month</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-atherbot-dark">12,458</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">87,542</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-atherbot-dark">Tokens</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-atherbot-dark">1,000,000 / month</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-atherbot-dark">256,789</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">743,211</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-atherbot-dark">Concurrent Requests</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-atherbot-dark">10</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-atherbot-dark">-</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-atherbot-dark">-</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-atherbot-dark">Knowledge Base Storage</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-atherbot-dark">5 GB</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-atherbot-dark">1.2 GB</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">3.8 GB</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button variant="outline" className="gap-1">
                <ExternalLink className="h-4 w-4" />
                <span>View Billing & Plans</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="webhooks">
          <Card>
            <CardHeader>
              <CardTitle>Webhooks</CardTitle>
              <CardDescription>
                Configure webhooks for real-time event notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-20 flex flex-col items-center justify-center text-center">
                <div className="h-16 w-16 bg-atherbot-muted rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-atherbot-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-atherbot-dark mb-2">Webhook Support Coming Soon</h3>
                <p className="text-atherbot-gray max-w-md mx-auto mb-6">
                  We're working on adding webhook support to allow real-time notifications for various events. Stay tuned for this feature!
                </p>
                <Button variant="outline">Join Waitlist</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ApiPage;
