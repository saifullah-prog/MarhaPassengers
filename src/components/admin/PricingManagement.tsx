import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface Pricing {
  id: string;
  vehicle_id: string;
  city_area: string;
  price_4h: number;
  price_8h: number;
  price_full_day: number;
  price_weekly: number;
  price_monthly: number;
  vehicles?: { name: string };
}

interface Vehicle {
  id: string;
  name: string;
}

export default function PricingManagement() {
  const [pricings, setPricings] = useState<Pricing[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPricing, setEditingPricing] = useState<Pricing | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    vehicle_id: '',
    city_area: '',
    price_4h: '' as string | number,
    price_8h: '' as string | number,
    price_full_day: '' as string | number,
    price_weekly: '' as string | number,
    price_monthly: '' as string | number,
  });

  useEffect(() => {
    loadPricings();
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    const { data } = await supabase.from('vehicles').select('id, name');
    setVehicles(data || []);
  };

  const loadPricings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('pricing')
      .select('*, vehicles(name)')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error loading pricing',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setPricings(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const pricingData = {
      ...formData,
      price_4h: Number(formData.price_4h),
      price_8h: Number(formData.price_8h),
      price_full_day: Number(formData.price_full_day),
      price_weekly: Number(formData.price_weekly),
      price_monthly: Number(formData.price_monthly),
    };

    if (editingPricing) {
      const { error } = await supabase
        .from('pricing')
        .update(pricingData)
        .eq('id', editingPricing.id);

      if (error) {
        toast({
          title: 'Error updating pricing',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      toast({ title: 'Pricing updated successfully' });
    } else {
      const { error } = await supabase.from('pricing').insert([pricingData]);

      if (error) {
        toast({
          title: 'Error adding pricing',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      toast({ title: 'Pricing added successfully' });
    }

    setDialogOpen(false);
    resetForm();
    loadPricings();
  };

  const handleEdit = (pricing: Pricing) => {
    setEditingPricing(pricing);
    setFormData({
      vehicle_id: pricing.vehicle_id,
      city_area: pricing.city_area,
      price_4h: pricing.price_4h,
      price_8h: pricing.price_8h,
      price_full_day: pricing.price_full_day,
      price_weekly: pricing.price_weekly,
      price_monthly: pricing.price_monthly,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this pricing?')) return;

    const { error } = await supabase.from('pricing').delete().eq('id', id);

    if (error) {
      toast({
        title: 'Error deleting pricing',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    toast({ title: 'Pricing deleted successfully' });
    loadPricings();
  };

  const resetForm = () => {
    setFormData({
      vehicle_id: '',
      city_area: '',
      price_4h: '',
      price_8h: '',
      price_full_day: '',
      price_weekly: '',
      price_monthly: '',
    });
    setEditingPricing(null);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Pricing Management</CardTitle>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Pricing
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPricing ? 'Edit Pricing' : 'Add New Pricing'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vehicle_id">Vehicle</Label>
                <Select
                  value={formData.vehicle_id}
                  onValueChange={(value) => setFormData({ ...formData, vehicle_id: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicles.map((vehicle) => (
                      <SelectItem key={vehicle.id} value={vehicle.id}>
                        {vehicle.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="city_area">City/Area</Label>
                <Input
                  id="city_area"
                  value={formData.city_area}
                  onChange={(e) => setFormData({ ...formData, city_area: e.target.value })}
                  placeholder="e.g., Dubai Marina"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price_4h">4 Hours (AED)</Label>
                  <Input
                    id="price_4h"
                    type="number"
                    value={formData.price_4h}
                    onChange={(e) => setFormData({ ...formData, price_4h: e.target.value })}
                    placeholder="0"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price_8h">8 Hours (AED)</Label>
                  <Input
                    id="price_8h"
                    type="number"
                    value={formData.price_8h}
                    onChange={(e) => setFormData({ ...formData, price_8h: e.target.value })}
                    placeholder="0"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price_full_day">Full Day (AED)</Label>
                  <Input
                    id="price_full_day"
                    type="number"
                    value={formData.price_full_day}
                    onChange={(e) => setFormData({ ...formData, price_full_day: e.target.value })}
                    placeholder="0"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price_weekly">Weekly (AED)</Label>
                  <Input
                    id="price_weekly"
                    type="number"
                    value={formData.price_weekly}
                    onChange={(e) => setFormData({ ...formData, price_weekly: e.target.value })}
                    placeholder="0"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price_monthly">Monthly (AED)</Label>
                <Input
                  id="price_monthly"
                  type="number"
                  value={formData.price_monthly}
                  onChange={(e) => setFormData({ ...formData, price_monthly: e.target.value })}
                  placeholder="0"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingPricing ? 'Update' : 'Add'} Pricing
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>City/Area</TableHead>
                  <TableHead>4 Hours</TableHead>
                  <TableHead>8 Hours</TableHead>
                  <TableHead>Full Day</TableHead>
                  <TableHead>Weekly</TableHead>
                  <TableHead>Monthly</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pricings.map((pricing) => (
                  <TableRow key={pricing.id}>
                    <TableCell className="font-medium">{pricing.vehicles?.name}</TableCell>
                    <TableCell>{pricing.city_area}</TableCell>
                    <TableCell>AED {pricing.price_4h}</TableCell>
                    <TableCell>AED {pricing.price_8h}</TableCell>
                    <TableCell>AED {pricing.price_full_day}</TableCell>
                    <TableCell>AED {pricing.price_weekly}</TableCell>
                    <TableCell>AED {pricing.price_monthly}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(pricing)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(pricing.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
