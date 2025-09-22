import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowRight, Plus, Search, X, IndianRupee } from 'lucide-react';
import { formatINR, usdToInr } from '../utils/currency';
import { useTranslation } from '../contexts/TranslationContext';

import { createSellerListing, getCurrentUser, listSellerListingsByUser, deleteSellerListing, SellerListing } from '../utils/api/sellListings';

export default function SellCredits() {
  const { t } = useTranslation();
  const [projectName, setProjectName] = useState('');
  const [type, setType] = useState('Mangrove Restoration');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState<number>(20);
  const [quantity, setQuantity] = useState<number>(100);
  const [description, setDescription] = useState('');
  const [certification, setCertification] = useState('Verified Carbon Standard (VCS)');
  const [coBenefits, setCoBenefits] = useState<string[]>([]);
  const [newBenefit, setNewBenefit] = useState('');
  const [search, setSearch] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [listings, setListings] = useState<SellerListing[]>([]);
  const [errorText, setErrorText] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const user = await getCurrentUser();
      if (user) {
        setUserId(user.id);
        try {
          const rows = await listSellerListingsByUser(user.id);
          setListings(rows);
        } catch (e: any) {
          console.error('Failed to load listings', e?.message || e);
          setErrorText(`Could not load listings: ${e?.message || e}`);
        }
      }
      setLoading(false);
    };
    init();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return listings;
    return listings.filter(l =>
      l.project_name.toLowerCase().includes(q) ||
      l.type.toLowerCase().includes(q) ||
      l.location.toLowerCase().includes(q)
    );
  }, [search, listings]);

  const addBenefit = () => {
    if (newBenefit.trim() && !coBenefits.includes(newBenefit.trim())) {
      setCoBenefits(prev => [...prev, newBenefit.trim()]);
      setNewBenefit('');
    }
  };

  const removeBenefit = (benefit: string) => {
    setCoBenefits(prev => prev.filter(b => b !== benefit));
  };

  const handleCreate = () => {
    if (!projectName || !location || !description || price <= 0 || quantity <= 0) {
      alert('Please fill all required fields with valid values');
      return;
    }
    if (!userId) {
      alert('Please sign in to create listings');
      return;
    }
    (async () => {
      try {
        const created = await createSellerListing(userId, {
          project_name: projectName,
          type,
          location,
          price_per_credit: price,
          quantity,
          description,
          certification,
          co_benefits: coBenefits,
        });
        setListings(prev => [created, ...prev]);
        setProjectName('');
        setLocation('');
        setDescription('');
        setPrice(20);
        setQuantity(100);
        setCoBenefits([]);
        setErrorText('');
      } catch (e: any) {
        const message = e?.message || String(e);
        console.error('Create listing failed', message);
        setErrorText(`Failed to create listing: ${message}`);
        alert(`Failed to create listing: ${message}`);
      }
    })();
  };

  const handleDelete = async (listingId: string) => {
    if (!confirm('Are you sure you want to delete this listing? This will remove it from the marketplace.')) return;
    
    try {
      console.log('Starting delete process for listing:', listingId);
      
      // Delete from Supabase first
      await deleteSellerListing(listingId);
      console.log('Successfully deleted from Supabase');
      
      // Update local state
      setListings(prev => prev.filter(l => l.id !== listingId));
      setErrorText('');
      
      // Trigger marketplace refresh
      console.log('SellCredits: Dispatching listingUpdated event');
      window.dispatchEvent(new CustomEvent('listingUpdated'));
      
      // Also try localStorage to trigger storage event
      localStorage.setItem('listingUpdated', Date.now().toString());
      
      alert('Listing deleted successfully from database!');
    } catch (e: any) {
      const message = e?.message || String(e);
      console.error('Delete listing failed:', e);
      setErrorText(`Failed to delete listing: ${message}`);
      alert(`Failed to delete listing: ${message}\n\nCheck browser console for details.`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">{t('sell.title')}</h1>
          <p className="text-muted-foreground mt-1">{t('sell.subtitle')}</p>
        </div>

        <Tabs defaultValue="create">
          <TabsList>
            <TabsTrigger value="create">{t('sell.createListing')}</TabsTrigger>
            <TabsTrigger value="listings">{t('sell.yourListings')}</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('sell.listingDetails')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="projectName">{t('sell.projectName')} *</Label>
                      <Input id="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder={t('sell.projectNamePlaceholder')} />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('sell.projectType')}</Label>
                      <Select value={type} onValueChange={setType}>
                        <SelectTrigger>
                          <SelectValue placeholder={t('sell.selectType')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mangrove Restoration">{t('sell.mangroveRestoration')}</SelectItem>
                          <SelectItem value="Seagrass Conservation">{t('sell.seagrassConservation')}</SelectItem>
                          <SelectItem value="Salt Marsh Restoration">{t('sell.saltMarshRestoration')}</SelectItem>
                          <SelectItem value="Community-Based">{t('sell.communityBased')}</SelectItem>
                          <SelectItem value="Conservation">{t('sell.conservation')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">{t('sell.location')} *</Label>
                      <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder={t('sell.locationPlaceholder')} />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('sell.certification')}</Label>
                      <Select value={certification} onValueChange={setCertification}>
                        <SelectTrigger>
                          <SelectValue placeholder={t('sell.selectCertification')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Verified Carbon Standard (VCS)">{t('sell.verifiedCarbonStandard')}</SelectItem>
                          <SelectItem value="Gold Standard">{t('sell.goldStandard')}</SelectItem>
                          <SelectItem value="Plan Vivo">{t('sell.planVivo')}</SelectItem>
                          <SelectItem value="Climate Action Reserve">{t('sell.climateActionReserve')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">{t('sell.projectDescription')} *</Label>
                      <textarea 
                        id="description"
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        placeholder={t('sell.descriptionPlaceholder')}
                        className="w-full p-3 border border-gray-300 rounded-md resize-none h-24"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">{t('sell.pricePerCredit')} *</Label>
                        <Input id="price" type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(parseFloat(e.target.value) || 0)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quantity">{t('sell.quantity')} *</Label>
                        <Input id="quantity" type="number" min="1" step="1" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 0)} />
                      </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label>{t('sell.coBenefits')}</Label>
                      <div className="flex gap-2">
                        <Input 
                          value={newBenefit} 
                          onChange={(e) => setNewBenefit(e.target.value)} 
                          placeholder={t('sell.coBenefitsPlaceholder')}
                          onKeyPress={(e) => e.key === 'Enter' && addBenefit()}
                        />
                        <Button type="button" onClick={addBenefit} variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {coBenefits.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {coBenefits.map((benefit, index) => (
                            <Badge key={index} variant="outline" className="flex items-center gap-1">
                              {benefit}
                              <button onClick={() => removeBenefit(benefit)} className="ml-1 text-red-500 hover:text-red-700">
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    {t('sell.estimatedTotalValue')}: <span className="font-semibold">{formatINR(price * quantity)}</span>
                  </div>
                  <Button onClick={handleCreate}>
                    <Plus className="h-4 w-4 mr-2" />
                    {t('sell.createListingButton')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="listings" className="mt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9" placeholder={t('sell.searchListings')} value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t('sell.yourListings')}</CardTitle>
              </CardHeader>
              <CardContent>
                {errorText && (
                  <div className="mb-4 text-sm text-red-600">
                    {errorText}
                  </div>
                )}
                {loading ? (
                  <div className="py-10 text-center text-muted-foreground">{t('sell.loading')}</div>
                ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('sell.project')}</TableHead>
                      <TableHead className="hidden md:table-cell">{t('sell.type')}</TableHead>
                      <TableHead className="hidden md:table-cell">{t('sell.location')}</TableHead>
                      <TableHead className="text-right">{t('sell.price')}</TableHead>
                      <TableHead className="text-right">{t('sell.quantity')}</TableHead>
                      <TableHead className="hidden md:table-cell">{t('sell.created')}</TableHead>
                      <TableHead>{t('sell.status')}</TableHead>
                      <TableHead className="w-12">{t('sell.action')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((l) => (
                      <TableRow key={l.id}>
                        <TableCell>
                          <div className="font-medium">{l.project_name}</div>
                          <div className="text-xs text-muted-foreground md:hidden">{l.type} • {l.location}</div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{l.type}</TableCell>
                        <TableCell className="hidden md:table-cell">{l.location}</TableCell>
                        <TableCell className="text-right">{formatINR(usdToInr(l.price_per_credit), { maximumFractionDigits: 0 })}</TableCell>
                        <TableCell className="text-right">{l.quantity.toLocaleString()}</TableCell>
                        <TableCell className="hidden md:table-cell">{new Date(l.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant={l.status === 'active' ? 'default' : l.status === 'paused' ? 'secondary' : 'outline'}>
                            {l.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(l.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filtered.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center text-muted-foreground">
                          {t('sell.noListingsFound')}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


