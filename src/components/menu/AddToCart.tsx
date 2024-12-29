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
import { Extra, ProductSizes, Size } from "@prisma/client"
import { ProductWithRelations } from "@/types/products"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { addCartItem, removeCartItem, removeItem, selectCartItems } from "@/store/features/cart/cartSlice"
import { getCartQuantity, getItemQuantity } from "@/lib/cart"

const AddToCart = ({ item }: { item: ProductWithRelations[] }) => {
    const dispatch = useAppDispatch()
    const cart = useAppSelector(selectCartItems)
    const cartQuantity = getItemQuantity(item.id, cart)
    const defaultSize = cart.find((element) => element.id === item.id)?.size || item.sizes.find((size) => size.name === ProductSizes.SMALL);
    const defaultExtras = cart.find((element) => element.id === item.id)?.extras || []
    const [seletectedExtras, setSeletectedExtras] = useState<Extra[]>(defaultExtras)
    const [seletectedSize, setSelectedSize] = useState<Size>(defaultSize)

    let totalPrice = item?.basePrice
    if (seletectedSize) {
        totalPrice += seletectedSize.price
    }
    if (seletectedExtras.length > 0) {
        for (const extra of seletectedExtras) {
            totalPrice += extra.price
        }
    }

    const handelAddToCart = () => {
        dispatch(addCartItem({
            id: item.id,
            name: item.name,
            image: item.image,
            basePrice: item.basePrice,
            size: seletectedSize,
            extras: seletectedExtras
        }))
    }

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
                        <PickSize sizes={item.sizes} item={item}
                            seletectedSize={seletectedSize} setSelectedSize={setSelectedSize}
                        />
                    </div>
                    <div className=" space-y-4 text-center">
                        <Label htmlFor="add-extras">Any Extras? </Label>
                        <Extras extras={item.extras} seletectedExtras={seletectedExtras} setSeletectedExtras={setSeletectedExtras} />
                    </div>
                </div>
                <DialogFooter>
                    {
                        cartQuantity === 0 ?
                            <Button
                                type='submit'
                                className='w-full h-10'
                                onClick={handelAddToCart}>
                                {

                                }
                                Add to cart {formatCurrency(totalPrice)}
                            </Button> :
                            <ChooseQuantity
                            cartQuantity={cartQuantity}
                                item={item}
                                seletectedSize={seletectedSize}
                                seletectedExtras={seletectedExtras}
                            />

                    }


                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddToCart


function PickSize({ sizes, item, seletectedSize, setSelectedSize }:
    {
        sizes: Size[],
        seletectedSize: Size,
        setSelectedSize: React.Dispatch<React.SetStateAction<Size>>,
        item: ProductWithRelations[]
    }) {
    return (
        <RadioGroup defaultValue="comfortable">
            {sizes.map((size) => {
                return (
                    <div key={size.id} className="flex items-center space-x-2 border border-gray-100 rounded-md p-4">
                        <RadioGroupItem
                            value={seletectedSize.name}
                            onClick={() => setSelectedSize(size)}
                            checked={seletectedSize.id === size.id}
                            id={size.id} />
                        <Label htmlFor={size.id} >{size.name} {formatCurrency(size.price + item.basePrice)}</Label>
                    </div>
                )
            })}
        </RadioGroup>
    )
}

function Extras({ extras, setSeletectedExtras, seletectedExtras }:
    {
        extras: Extra[],
        seletectedExtras: Extra[],
        setSeletectedExtras: React.Dispatch<React.SetStateAction<Extra[]>>
    }) {
    const handelExtra = (extra: Extra) => {
        if (seletectedExtras.find(e => e.id === extra.id)) {
            setSeletectedExtras(seletectedExtras.filter(e => e.id !== extra.id));
        } else {
            setSeletectedExtras([...seletectedExtras, extra]);
        }
    }
    return (
        <RadioGroup defaultValue="comfortable">
            {extras.map((extra) => {
                return (
                    <div key={extra.id} className="flex items-center space-x-2 border border-gray-100 rounded-md p-4">
                        <Checkbox checked={Boolean(seletectedExtras.find((e) => e.id === extra.id))}
                            onClick={() => handelExtra(extra)} id={extra.id} />
                        <Label className='text-sm text-accent font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            htmlFor={extra.id} >{extra.name} {formatCurrency(extra.price)}</Label>
                    </div>
                )
            })}

        </RadioGroup>
    )
}

const ChooseQuantity = ({
    cartQuantity,
    item,
    selectedExtras,
    selectedSize,
  }: {
    cartQuantity: number;
    selectedExtras: Extra[];
    selectedSize: Size;
    item: ProductWithRelations;
  }) => {
    const dispatch = useAppDispatch();
    return (
      <div className='flex items-center flex-col gap-2 mt-4 w-full'>
        <div className='flex items-center justify-center gap-2'>
          <Button
            variant='outline'
            onClick={() => dispatch(removeCartItem({ id: item.id }))}
          >
            -
          </Button>
          <div>
            <span className='text-black'>{cartQuantity} in cart</span>
          </div>
          <Button
            variant='outline'
            onClick={() =>
              dispatch(
                addCartItem({
                  basePrice: item.basePrice,
                  id: item.id,
                  image: item.image,
                  name: item.name,
                  extras: selectedExtras,
                  size: selectedSize,
                })
              )
            }
          >
            +
          </Button>
        </div>
        <Button
          size='sm'
          onClick={() => dispatch(removeItem({ id: item.id }))}
        >
          Remove
        </Button>
      </div>
    );
  };