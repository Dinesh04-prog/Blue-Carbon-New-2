import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Shield, ShoppingCart, Leaf, User, Mail } from 'lucide-react';
import blueMitraLogo from 'figma:asset/4278c6b56461cdf7f9081edcb230c99caa111a5f.png';
import { supabase } from '../utils/supabase/client';

interface AuthModalProps {
  onClose: () => void;
}

export function AuthModal({ onClose }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const roles = [
    {
      id: 'buyer',
      title: 'Credit Buyer',
      description: 'Purchase blue carbon credits for offset programs',
      icon: ShoppingCart,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'developer',
      title: 'Project Developer',
      description: 'Submit and manage blue carbon projects',
      icon: Leaf,
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 'validator',
      title: 'Validator',
      description: 'Review and validate carbon credit projects',
      icon: Shield,
      color: 'bg-purple-100 text-purple-800'
    }
  ];

  const handleSubmit = async (e: React.FormEvent, isSignUp: boolean) => {
    e.preventDefault();
    if (!selectedRole && isSignUp) {
      alert('Please select a role');
      return;
    }

    setIsLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
              user_type: selectedRole
            }
          }
        });
        if (error) throw error;
        alert('Sign up successful! Please check your email for confirmation.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });
        if (error) throw error;
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-4">
        <DialogHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <img 
              src={blueMitraLogo} 
              alt="BlueMitra Logo" 
              className="h-16 w-16 object-contain"
            />
          </div>
          <DialogTitle className="text-2xl">Welcome to BlueMitra</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Blue Carbon Credits Marketplace - Sign in or create an account to start trading verified blue carbon credits
          </DialogDescription>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Shield className="h-3 w-3 mr-1" />
              Verified Platform
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <Leaf className="h-3 w-3 mr-1" />
              Blockchain Secured
            </Badge>
          </div>
        </DialogHeader>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-4">
            <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <Input
                  id="signin-email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <Input
                  id="signin-password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleOAuthSignIn('google')}
                disabled={isLoading}
              >
                <Mail className="h-4 w-4 mr-2" />
                Google
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleOAuthSignIn('github')}
                disabled={isLoading}
              >
                <User className="h-4 w-4 mr-2" />
                GitHub
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                  required
                />
              </div>

              <div className="space-y-3">
                <Label>Select Your Role</Label>
                <div className="grid gap-3">
                  {roles.map((role) => {
                    const Icon = role.icon;
                    return (
                      <Card 
                        key={role.id} 
                        className={`cursor-pointer transition-colors ${
                          selectedRole === role.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setSelectedRole(role.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${role.color}`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{role.title}</span>
                                {selectedRole === role.id && (
                                  <Badge className="bg-primary text-primary-foreground text-xs">Selected</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {role.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading || !selectedRole}>
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}