"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { formatCurrency } from "@/lib/formatters"
import { Checkbox } from "../ui/checkbox"
import { Extra,  Size } from "@prisma/client"
import { ProductWithRelations } from "@/types/products"

const AddToCart = ({ item }: { item: ProductWithRelations[] }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button type="button" className="mt-4 text-white rounded-full !px-8" size="lg">
                    <span>Add To Cart</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
                <DialogHeader className="flex items-center text-center ">
                    <Image src={item.image} alt={item.name} width={200} height={200} />
                    <DialogTitle>{item.name}</DialogTitle>
                    <DialogDescription>
                        {item.description}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-10">
                    <div className=" space-y-4 text-center">
                        <Label htmlFor="pick-size">Pick Your Size</Label>
                        <PickSize sizes={item.sizes} item={item} />
                    </div>
                    <div className=" space-y-4 text-center">
                        <Label htmlFor="add-extras">Any Extras? </Label>
                        <Extras extras={item.extras} />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type='submit'
                        className='w-full h-10'>
                        Add to cart {formatCurrency(10)}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddToCart


function PickSize({ sizes, item }: { sizes: Size[], item: ProductWithRelations[] }) {
    return (
        <RadioGroup defaultValue="comfortable">
            {sizes.map((size ) => {
                return (
                    <div key={size.id} className="flex items-center space-x-2 border border-gray-100 rounded-md p-4">
                        <RadioGroupItem value="default" id={size.id} />
                        <Label htmlFor={size.id} >{size.name} {formatCurrency(size.price + item.basePrice)}</Label>
                    </div>
                )
            })}
        </RadioGroup>
    )
}

function Extras({ extras }: { extras: Extra[] }) {
    return (
        <RadioGroup defaultValue="comfortable">
            {extras.map((extra) => {
                return (
                    <div key={extra.id} className="flex items-center space-x-2 border border-gray-100 rounded-md p-4">
                        <Checkbox value="default" id={extra.id} />
                        <Label className='text-sm text-accent font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            htmlFor={extra.id} >{extra.name} {formatCurrency(extra.price)}</Label>
                    </div>
                )
            })}

        </RadioGroup>
    )
}