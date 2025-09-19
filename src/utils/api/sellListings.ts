import { supabase } from '../../utils/supabase/client';

export type SellerListing = {
  id: string;
  user_id: string;
  project_name: string;
  type: string;
  location: string;
  price_per_credit: number;
  quantity: number;
  description?: string;
  certification?: string;
  co_benefits?: string[];
  created_at: string;
  status: 'active' | 'sold' | 'paused';
};

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}

export async function listSellerListingsByUser(userId: string): Promise<SellerListing[]> {
  const { data, error } = await supabase
    .from('seller_listings')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []) as SellerListing[];
}

export async function listActiveSellerListings(): Promise<SellerListing[]> {
  const { data, error } = await supabase
    .from('seller_listings')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as SellerListing[];
}

export async function deleteSellerListing(listingId: string): Promise<void> {
  console.log('Deleting listing from Supabase:', listingId);
  
  const { data, error } = await supabase
    .from('seller_listings')
    .delete()
    .eq('id', listingId)
    .select();
    
  if (error) {
    console.error('Supabase delete error:', error);
    throw error;
  }
  
  console.log('Delete result:', data);
  console.log('Successfully deleted listing from Supabase');
}

export type CreateSellerListingInput = {
  project_name: string;
  type: string;
  location: string;
  price_per_credit: number;
  quantity: number;
  description?: string;
  certification?: string;
  co_benefits?: string[];
};

export async function createSellerListing(userId: string, input: CreateSellerListingInput): Promise<SellerListing> {
  const payload = {
    user_id: userId,
    status: 'active' as const,
    ...input,
  };

  const { data, error } = await supabase
    .from('seller_listings')
    .insert(payload)
    .select('*')
    .single();

  if (error) throw error;
  return data as SellerListing;
}


