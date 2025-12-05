import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import InvoiceItem from './invoice-item';
import { useInvoice } from '@/context/invoice-context';



export default function ItemsList() {
  const {invoice, addItem,  updateInvoice} = useInvoice();
  // Function to handle adding a new item
  
  return (
   <Card>
    <CardHeader className='flex flex-row items-center justify-between'>
      <CardTitle>Invoice Items</CardTitle>
      <Button onClick={addItem} size="sm">
        <Plus className='w-4 h-4 mr-2'/>
        Add Item
      </Button>
    </CardHeader>
    <CardContent className='space-y-4'>
      {invoice.items.map((item, index) => (
        <InvoiceItem  key={item.id} 
          item={item}  index={index} canRemove={invoice.items.length > 1}
        />
      ))}
    </CardContent>
   </Card>
  );
}
