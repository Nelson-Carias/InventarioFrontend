import  {useState, useEffect} from 'react'
import { create_sale, delete_sale, get_sale, update_sale  } from '../service/sale.service'
import { IGetSale, ICreateSale, IUpdateSale} from '../types/sale.types'

const useSaleStore = () => {
    const [sale, setSale] = useState<IGetSale[]>([])
    
    useEffect(() =>{
        OnGetSale();
    }, []);

    const OnGetSale = async () => {
        try{
            const data = await get_sale();
            setSale(data.sales);
        }catch{
            return({

            })
        }
    };

    const OnCreateSale = async (sale:ICreateSale) => {
        try {
            const data = await create_sale(sale);
            if (data.ok){
                await OnGetSale()
            }
        }catch (error) {
            return({

            })
        }
    };


    const OnUpdateSale = async (id: number, sale: IUpdateSale)=> {
        try {
            const data = await update_sale(id, sale)

            if (data.ok){
                await OnGetSale()
            }

        } catch (error) {
            return({

            })
        }
    };


    const OnDeleteSale = async (id: number) => {
        try{
            const data = await delete_sale(id);
            if (data.ok){
                await OnGetSale()
            }
        }catch{
            return({

            })
        }
    }

    return{
        sale, 
        OnGetSale, 
        OnCreateSale, 
        OnUpdateSale,
        OnDeleteSale
    }

}

export default useSaleStore