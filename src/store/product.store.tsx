import { useState, useEffect } from "react";
import { get_products, create_product, update_product, delete_product } from "../service/product.service";
import { IGetProducts, ICreateProduct, IUpdateProduct } from "../types/product.types";

const useProductStore = () => {
    const [products, setProducts] = useState<IGetProducts[]> ([]);

    useEffect(() => {
        OnGetProducts();
    }, [])

    const OnGetProducts = async () => {
        try {
            const data = await get_products();
            setProducts(data.products);
        } catch (error) {
            return  ({

            })

        }
    };

    const OnCreateProduct = async (product: ICreateProduct) => {
        try {
            const data = await create_product(product)
            if(data.ok){
                await OnGetProducts()
            }
        } catch (error) {
            return({

            })
        }
    };

    const OnDeleteProduct = async (id: number) => {
        try {
            const data = await delete_product(id)
            if(data.ok){
                await OnGetProducts()
            }
        } catch (error) {
            return({

            })
        }
    };

    const OnUpdateProduct = async (id: number, product: IUpdateProduct) => {
        try {
            const data = await update_product(id, product)
            if(data.ok){
                await OnGetProducts()
            }
        } catch (error) {
            return({

            })
        }
    };

    return{
        products,
        OnGetProducts,
        OnCreateProduct,
        OnDeleteProduct,
        OnUpdateProduct,
    }

}

export default useProductStore