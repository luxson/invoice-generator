import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import InvoiceItem from './invoice-item';


//Array as an example for items
const items = [
  { id: "1", description: "Item 1", mode:"quantity", quantity: 2, rate: 120 , price: 10.0 },
  { id: "2", description: "Item 2", mode:"hourly", hours: 1, rate: 120 , price: 20.0 },
] as const satisfies InvoiceItem[];

export default function ItemsList() {
  // Function to handle adding a new item
  const addItem = () => {
    // Logic to add a new item
    console.log("Add Item clicked");
  }
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
      {items.map((item, index) => (
        <InvoiceItem  key={item.id} 
          item={item}  index={index} canRemove={items.length > 1}
        />
      ))}
    </CardContent>
   </Card>
  );
}
