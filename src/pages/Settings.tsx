
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { BarChart3, CreditCard, LogOut, Save, Trash, Upload, User } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DashboardLayout from '@/components/DashboardLayout';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [profileForm, setProfileForm] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    company: 'Tech Innovators Inc.',
    bio: 'AI enthusiast and tech entrepreneur working on cutting-edge solutions.'
  });
  
  // Dummy chart data
  const usageData = [
    { date: '2023-05-01', requests: 240, tokens: 12000 },
    { date: '2023-05-15', requests: 580, tokens: 29000 },
    { date: '2023-06-01', requests: 820, tokens: 41000 },
    { date: '2023-06-15', requests: 1100, tokens: 55000 },
    { date: '2023-07-01', requests: 1400, tokens: 70000 },
    { date: '2023-07-15', requests: 1900, tokens: 95000 },
    { date: '2023-08-01', requests: 2200, tokens: 110000 },
    { date: '2023-08-15', requests: 2800, tokens: 140000 },
    { date: '2023-09-01', requests: 3200, tokens: 160000 },
    { date: '2023-09-15', requests: 4000, tokens: 200000 },
  ];
  
  // Dummy billing history
  const billingHistory = [
    { date: 'Oct 1, 2023', amount: '$49.00', status: 'Paid', plan: 'Pro Plan (Monthly)' },
    { date: 'Sep 1, 2023', amount: '$49.00', status: 'Paid', plan: 'Pro Plan (Monthly)' },
    { date: 'Aug 1, 2023', amount: '$49.00', status: 'Paid', plan: 'Pro Plan (Monthly)' },
    { date: 'Jul 1, 2023', amount: '$29.00', status: 'Paid', plan: 'Basic Plan (Monthly)' },
    { date: 'Jun 1, 2023', amount: '$29.00', status: 'Paid', plan: 'Basic Plan (Monthly)' },
  ];
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Profile updated',
      description: 'Your profile information has been updated successfully',
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-atherbot-dark mb-2">Settings</h1>
        <p className="text-atherbot-gray">Manage your account settings and preferences</p>
      </div>
      
      <Tabs defaultValue="profile" className="mb-8">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="usage" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Usage
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and profile settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="https://randomuser.me/api/portraits/men/42.jpg" />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Change photo
                    </Button>
                  </div>
                  
                  <div className="md:w-2/3 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={profileForm.name}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileForm.email}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        value={profileForm.company}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={profileForm.bio}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full p-2 mt-1 border rounded-md"
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end gap-2">
                  <Button type="submit" className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <Card className="border-red-100">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions that affect your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border border-red-200 bg-red-50 rounded-md">
                <div className="flex items-start">
                  <div className="flex-grow">
                    <h4 className="font-medium text-red-800 mb-1">Delete Account</h4>
                    <p className="text-sm text-red-600">
                      Once you delete your account, all of your data will be permanently removed. This action cannot be undone.
                    </p>
                  </div>
                  <Button variant="destructive" size="sm" className="gap-1">
                    <Trash className="h-4 w-4" />
                    Delete Account
                  </Button>
                </div>
              </div>
              
              <div className="p-4 border border-amber-200 bg-amber-50 rounded-md">
                <div className="flex items-start">
                  <div className="flex-grow">
                    <h4 className="font-medium text-amber-800 mb-1">Sign Out</h4>
                    <p className="text-sm text-amber-600">
                      Sign out from your account on this device.
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="text-amber-600 border-amber-300 gap-1">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>
                Manage your subscription and billing details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-gradient-to-r from-atherbot-blue/10 to-purple-400/10 rounded-md border border-atherbot-blue/20 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="text-sm text-atherbot-gray mb-1">Current Plan</div>
                    <div className="text-xl font-semibold text-atherbot-dark">Pro Plan</div>
                    <div className="text-sm text-atherbot-gray mt-1">$49/month • Renews on Nov 1, 2023</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Change Plan</Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">Cancel Plan</Button>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Payment Method</h3>
                <div className="p-4 border rounded-md bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-14 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Visa ending in 4242</div>
                      <div className="text-sm text-atherbot-gray">Expires 12/2025</div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-right">
                  <Button variant="link" className="p-0 h-auto text-sm">Edit payment method</Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Billing History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-left">
                        <th className="px-4 py-2 border-b">Date</th>
                        <th className="px-4 py-2 border-b">Amount</th>
                        <th className="px-4 py-2 border-b">Status</th>
                        <th className="px-4 py-2 border-b">Description</th>
                        <th className="px-4 py-2 border-b"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {billingHistory.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-3">{item.date}</td>
                          <td className="px-4 py-3">{item.amount}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              {item.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">{item.plan}</td>
                          <td className="px-4 py-3 text-right">
                            <Button variant="link" className="p-0 h-auto text-sm">Download</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Usage</CardTitle>
              <CardDescription>
                Monitor your API usage over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={usageData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0071e3" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#0071e3" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => {
                        const d = new Date(date);
                        return `${d.getMonth() + 1}/${d.getDate()}`;
                      }}
                    />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="requests" 
                      stroke="#0071e3" 
                      fillOpacity={1} 
                      fill="url(#colorRequests)" 
                      name="API Requests"
                    />
                    <Area 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="tokens" 
                      stroke="#8884d8" 
                      fillOpacity={1} 
                      fill="url(#colorTokens)" 
                      name="Tokens Used"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 border rounded-lg bg-atherbot-muted">
                  <div className="text-sm text-atherbot-gray mb-1">Total Requests (Current Month)</div>
                  <div className="text-2xl font-semibold">4,732</div>
                  <div className="text-xs text-green-600 mt-1">+18% from last month</div>
                </div>
                
                <div className="p-4 border rounded-lg bg-atherbot-muted">
                  <div className="text-sm text-atherbot-gray mb-1">Total Tokens (Current Month)</div>
                  <div className="text-2xl font-semibold">236,491</div>
                  <div className="text-xs text-green-600 mt-1">+22% from last month</div>
                </div>
                
                <div className="p-4 border rounded-lg bg-atherbot-muted">
                  <div className="text-sm text-atherbot-gray mb-1">Average Response Time</div>
                  <div className="text-2xl font-semibold">243ms</div>
                  <div className="text-xs text-green-600 mt-1">-12% from last month</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4 text-sm text-atherbot-gray">
              <div>Usage data is updated hourly. Last updated: Oct 24, 2023, 15:30 UTC</div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings;
