
import React, { useState, useEffect } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bot, Copy, Eye, EyeOff, Key, Plus, RefreshCw, Shield, Trash2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getApiKeys, createApiKey, deleteApiKey, getApiRequests, getApiUsageStats, ApiKey, ApiRequest } from '@/services/apiKeyService';

const Dashboard = () => {
  const { toast } = useToast();
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [showNewKeyDialog, setShowNewKeyDialog] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [recentRequests, setRecentRequests] = useState<ApiRequest[]>([]);
  const [usageStats, setUsageStats] = useState({
    totalRequests: 0,
    totalTokens: 0
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  // Load data
  useEffect(() => {
    if (!user) return;
    
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Load API keys
        const keys = await getApiKeys();
        setApiKeys(keys);
        
        // Load usage stats
        const stats = await getApiUsageStats('month');
        setUsageStats({
          totalRequests: stats.totalRequests,
          totalTokens: stats.totalTokens
        });
        setRecentRequests(stats.recentRequests);
      } catch (error: any) {
        console.error('Error loading data:', error);
        toast({
          title: 'Error loading data',
          description: error.message || 'An unexpected error occurred',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [user, toast]);

  const toggleKeyVisibility = (keyId: string) => {
    setShowKey(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const copyApiKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success("API key copied to clipboard");
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

  const handleCreateApiKey = async () => {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusBadge = (status: number) => {
    if (status >= 200 && status < 300) {
      return <Badge className="bg-green-500">Success</Badge>;
    } else if (status >= 400 && status < 500) {
      return <Badge className="bg-yellow-500">Client Error</Badge>;
    } else if (status >= 500) {
      return <Badge className="bg-red-500">Server Error</Badge>;
    } else {
      return <Badge>Status {status}</Badge>;
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
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total API Calls</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{usageStats.totalRequests.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    This month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active API Keys
                  </CardTitle>
                  <Key className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{apiKeys.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {apiKeys.length > 0 ? 'Manage in API Keys tab' : 'Create one in API Keys tab'}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Tokens Used</CardTitle>
                  <Bot className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{usageStats.totalTokens.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    This month
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Recent API Calls</CardTitle>
                  <CardDescription>Your recent API activity</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-8">Loading...</div>
                  ) : recentRequests.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Bot className="mx-auto h-12 w-12 opacity-20 mb-2" />
                      <p>No API requests yet</p>
                      <p className="text-sm mt-1">Start using your API to see activity here</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentRequests.map((request) => (
                        <div key={request.id} className="flex items-center">
                          <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {request.method} {request.endpoint}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(request.created_at)}
                            </p>
                          </div>
                          <div className="ml-auto">
                            {getStatusBadge(request.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>API Usage</CardTitle>
                  <CardDescription>Your API usage for this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <Bot className="h-4 w-4 mr-2" />
                          <span>API Requests</span>
                        </div>
                        <span>{usageStats.totalRequests.toLocaleString()} / 5,000</span>
                      </div>
                      <Progress value={Math.min((usageStats.totalRequests / 5000) * 100, 100)} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 mr-2" />
                          <span>Tokens Used</span>
                        </div>
                        <span>{usageStats.totalTokens.toLocaleString()} / 1,000,000</span>
                      </div>
                      <Progress value={Math.min((usageStats.totalTokens / 1000000) * 100, 100)} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="api-keys" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>Manage your API keys</CardDescription>
                </div>
                <Dialog open={showNewKeyDialog} onOpenChange={setShowNewKeyDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create API Key
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New API Key</DialogTitle>
                      <DialogDescription>
                        Create a new API key to authenticate your API requests.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="key-name" className="text-right">
                          Key Name
                        </Label>
                        <Input
                          id="key-name"
                          value={newKeyName}
                          onChange={(e) => setNewKeyName(e.target.value)}
                          placeholder="e.g. Production API Key"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowNewKeyDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateApiKey}>Create Key</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  {isLoading ? (
                    <div className="text-center py-8">Loading...</div>
                  ) : apiKeys.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Key className="mx-auto h-12 w-12 opacity-20 mb-2" />
                      <p>You don't have any API keys yet</p>
                      <p className="text-sm mt-1">Create one to start using the API</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {apiKeys.map((apiKey) => (
                        <div key={apiKey.id} className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{apiKey.name}</h3>
                              <div className="mt-1 flex items-center">
                                <div className="text-sm text-muted-foreground font-mono flex items-center max-w-[300px] overflow-hidden">
                                  {showKey[apiKey.id] ? (
                                    apiKey.key
                                  ) : (
                                    `${apiKey.key.substring(0, 8)}...${apiKey.key.substring(apiKey.key.length - 4)}`
                                  )}
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => toggleKeyVisibility(apiKey.id)}
                                  className="ml-2"
                                >
                                  {showKey[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => copyApiKey(apiKey.key)}
                                  className="ml-2"
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="mt-1 text-xs text-muted-foreground">
                                Created: {formatDate(apiKey.created_at)}
                                {apiKey.last_used_at && ` • Last used: ${formatDate(apiKey.last_used_at)}`}
                              </div>
                            </div>
                            <Button 
                              variant="destructive" 
                              size="icon"
                              onClick={() => handleDeleteKey(apiKey.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
