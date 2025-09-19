import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Mail, Phone, MapPin, MessageSquare, Clock, Users } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! We\'ll get back to you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        inquiryType: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Support',
      details: 'support@bluemitra.com',
      description: 'General inquiries and customer support'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      details: '+1 (555) 123-MITRA',
      description: 'Monday - Friday, 9 AM - 6 PM EST'
    },
    {
      icon: MapPin,
      title: 'Global Headquarters',
      details: 'BlueMitra Sustainability Center',
      description: '123 Ocean Drive, Blue City, CA 90210'
    }
  ];

  const inquiryTypes = [
    'General Information',
    'Credit Purchase Support',
    'Project Development',
    'Partnership Opportunities',
    'Technical Support',
    'Media & Press',
    'Investment Inquiries',
    'Other'
  ];

  const supportTeams = [
    {
      icon: Users,
      title: 'Customer Success',
      description: 'Help with purchasing, accounts, and marketplace navigation',
      email: 'customers@bluemitra.com'
    },
    {
      icon: MessageSquare,
      title: 'Project Developers',
      description: 'Support for listing and managing blue carbon projects',
      email: 'developers@bluemitra.com'
    },
    {
      icon: Clock,
      title: 'Technical Support',
      description: 'Platform issues, integrations, and technical questions',
      email: 'tech@bluemitra.com'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl mb-4 text-gray-900">Get in Touch with BlueMitra</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about blue carbon credits, need help with your purchase, or want to 
              explore partnership opportunities? Our BlueMitra expert team is here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <h2 className="text-2xl mb-6 text-gray-900">Send us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Company/Organization</Label>
                      <Input
                        id="company"
                        type="text"
                        placeholder="Your company name (optional)"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange('inquiryType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          {inquiryTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Brief description of your inquiry"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide details about your inquiry, questions, or how we can help you..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
                  </Button>

                  <p className="text-sm text-gray-600 text-center">
                    We typically respond within 24 hours during business days
                  </p>
                </form>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Contact Details */}
              <Card className="p-6">
                <h3 className="text-xl mb-4 text-gray-900">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Icon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-gray-900">{info.title}</h4>
                          <p className="text-blue-600">{info.details}</p>
                          <p className="text-sm text-gray-600">{info.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Specialized Support Teams */}
              <Card className="p-6">
                <h3 className="text-xl mb-4 text-gray-900">Specialized Support</h3>
                <div className="space-y-4">
                  {supportTeams.map((team, index) => {
                    const Icon = team.icon;
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Icon className="h-4 w-4 text-gray-600" />
                          <h4 className="text-gray-900">{team.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600">{team.description}</p>
                        <p className="text-sm text-blue-600">{team.email}</p>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Response Times */}
              <Card className="p-6 bg-blue-50">
                <h3 className="text-lg mb-3 text-blue-900">Response Times</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-800">General Inquiries</span>
                    <span className="text-blue-600">24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800">Technical Support</span>
                    <span className="text-blue-600">4-8 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800">Urgent Issues</span>
                    <span className="text-blue-600">2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800">Partnership Inquiries</span>
                    <span className="text-blue-600">3-5 days</span>
                  </div>
                </div>
              </Card>

              {/* Office Hours */}
              <Card className="p-6">
                <h3 className="text-lg mb-3 text-gray-900">Office Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="text-gray-900">9 AM - 6 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="text-gray-900">10 AM - 4 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="text-gray-900">Closed</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Emergency support available 24/7 for critical platform issues
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* FAQ Link */}
          <Card className="mt-12 p-8 text-center bg-gradient-to-r from-teal-50 to-blue-50">
            <h3 className="text-2xl mb-4 text-gray-900">Need Quick Answers?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Check our comprehensive FAQ section for instant answers to common questions 
              about blue carbon credits, marketplace functionality, and project details.
            </p>
            <Button variant="outline" className="bg-white">
              Visit FAQ Section
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}