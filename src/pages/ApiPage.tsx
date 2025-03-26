
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertCircle, Check, Copy, ExternalLink, Info, Key, Plus, Trash } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { getApiKeys, createApiKey, deleteApiKey, updateApiKey, getApiRequests, ApiKey, ApiRequest } from '@/services/apiKeyService';
import ApiPlayground from '@/components/ApiPlayground';
import { useNavigate } from 'react-router-dom';

const ApiPage = () => {
  const { toast } = useToast();
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [showNewKeyDialog, setShowNewKeyDialog] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [recentRequests, setRecentRequests] = useState<ApiRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);
  
  // Load API keys and requests
  useEffect(() => {
    if (!user) return;
    
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Load API keys
        const keys = await getApiKeys();
        setApiKeys(keys);
        
        // Load recent API requests
        const requests = await getApiRequests(10);
        setRecentRequests(requests);
      } catch (error: any) {
        console.error('Error loading data:', error);
        toast({
          title: 'Error loading data',
          description: error.message || 'An error occurred while loading your data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [user, toast]);
  
  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({
      title: 'API key copied',
      description: 'The API key has been copied to your clipboard',
    });
  };
  
  const handleCreateKey = async () => {
    if (!newKeyName) {
      toast({
        title: 'Please provide a name',
        description: 'You need to provide a name for your API key',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      const newKey = await createApiKey(newKeyName);
      setApiKeys([newKey, ...apiKeys]);
      setShowNewKeyDialog(false);
      setNewKeyName('');
      
      // Show the full key
      setShowKey({ ...showKey, [newKey.id]: true });
      
      toast({
        title: 'API key created',
        description: 'Your new API key has been generated successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error creating API key',
        description: error.message || 'An error occurred while creating your API key',
        variant: 'destructive',
      });
    }
  };
  
  const handleDeleteKey = async (keyId: string) => {
    try {
      await deleteApiKey(keyId);
      setApiKeys(apiKeys.filter(key => key.id !== keyId));
      toast({
        title: 'API key deleted',
        description: 'Your API key has been deleted successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error deleting API key',
        description: error.message || 'An error occurred while deleting your API key',
        variant: 'destructive',
      });
    }
  };
  
  const toggleKeyVisibility = (keyId: string) => {
    setShowKey(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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
        <h1 className="text-3xl font-bold text-atherbot-dark mb-2">API Management</h1>
        <p className="text-atherbot-gray">Manage your API keys and integrations</p>
      </div>
      
      <Tabs defaultValue="keys" className="mb-8">
        <TabsList>
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="playground">Playground</TabsTrigger>
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
                {isLoading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : apiKeys.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Key className="mx-auto h-12 w-12 opacity-20 mb-2" />
                    <p>You don't have any API keys yet</p>
                    <p className="text-sm mt-1">Create one to start using the API</p>
                  </div>
                ) : (
                  apiKeys.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <Key className="h-4 w-4 text-atherbot-blue" />
                          <span className="font-medium text-atherbot-dark">{item.name}</span>
                        </div>
                        <div className="mt-1 flex items-center">
                          <div className="text-sm font-mono bg-atherbot-muted rounded-md px-2 py-1">
                            {showKey[item.id] 
                              ? item.key
                              : `${item.key.substring(0, 10)}...${item.key.substring(item.key.length - 4)}`
                            }
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => toggleKeyVisibility(item.id)}
                            className="ml-2"
                          >
                            {showKey[item.id] ? 'Hide' : 'Show'}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleCopyKey(item.key)}
                            className="ml-2"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="mt-1 text-xs text-atherbot-gray">
                          Created on {formatDate(item.created_at)}
                          {item.last_used_at && ` • Last used ${formatDate(item.last_used_at)}`}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="destructive" 
                          size="icon"
                          onClick={() => handleDeleteKey(item.id)}
                          title="Delete API Key"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4 text-sm text-atherbot-gray">
              <div className="flex items-center gap-1">
                <Info className="h-4 w-4" />
                <span>Keep your API keys secure and never share them publicly</span>
              </div>
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
        
        <TabsContent value="playground">
          <ApiPlayground />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ApiPage;

