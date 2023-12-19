import React, { useState } from "react";
import useSaleDetailStore from "../../store/saleDetail.store";
import { FaRegEdit } from "react-icons/fa";
import useSaleStore from "../../store/sale.store";
import useProductStore from "../../store/product.store";

const UpdateSaleDetail = ({
  id,
  newSaleDetailAmount,
  newSaleDetailUnitPrice,
  newSaleDetailSaleId,
  newSaleDetailProductId,
}: {
  id: number;
  newSaleDetailAmount: number;
  newSaleDetailUnitPrice: number;
  newSaleDetailSaleId: number;
  newSaleDetailProductId: number;
}) => {
  const { sale, OnGetSale } = useSaleStore();
  React.useEffect(() => {
    OnGetSale();
  }, []);

  const { products, OnGetProducts } = useProductStore();
  React.useEffect(() => {
    OnGetProducts();
  }, []);

  const { OnUpdateSaleDetail } = useSaleDetailStore();
  const [newAmount, setNewAmount] = useState(newSaleDetailAmount);
  const [newUnitPrice, setNewUnitPrice] = useState(newSaleDetailUnitPrice);

  const [newSaleId, setNewSaleId] = useState(newSaleDetailSaleId);
  const [newProductId, setNewProductId] = useState(newSaleDetailProductId);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewAmount(newSaleDetailAmount);
    setNewUnitPrice(newSaleDetailUnitPrice);

    setNewSaleId(newSaleDetailSaleId);
    setNewProductId(newSaleDetailProductId);
  };

  const handleInputChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputContact = e.target.value;
    const numericValue = parseInt(inputContact, 10);

    setNewAmount(numericValue);
    // setNewAmount(Number(e.target.value));
    // setNewAmount(Number(e.target.value));
  };

  const handleInputChangeUnitPrince = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputPrice = e.target.value;
    const PriceValue = parseInt(inputPrice, 10);

    setNewUnitPrice(PriceValue);
    // setNewUnitPrice(Number(e.target.value));
    // setNewAmount(Number(e.target.value));
  };

  const handleSelectChangeSale = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewSaleId(Number(e.target.value));
  };
  const handleSelectChangePId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewProductId(Number(e.target.value));
  };

  const handleSubmit = async () => {
    if (newAmount != null) {
      const updateSaleDetail = {
        id: id,
        amount: newAmount,
        unitPrice: newUnitPrice,

        saleId: newSaleId,
        productId: newProductId,
      };

      await OnUpdateSaleDetail(id, updateSaleDetail);
      closeModal();
    }
  };

  return (
    <div className="">
      <button
        onClick={openModal}
        className="flex justify-center py-2 px-2 text-green-500"
      >
        <FaRegEdit size={26}></FaRegEdit>
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
          <div className="bg-white rounded-lg shadow-lg p-6 ">
            <span onClick={closeModal}></span>
            <h3 className="text-lg font-medium mb-4 text-center">
              Editar detalle de Venta
            </h3>
            <form>
              <div className="mb-4 grid grid-cols-2 gap-5">
                <div>
                <label
                  htmlFor="total"
                  className="block text-gray-700 text-sm font-medium "
                >
                  Cantidad:
                </label>

                <input
                  type="number"
                  value={newAmount}
                  onChange={handleInputChangeAmount}
                  className="w-full h-10 p-4 border rounded-xl  " 
                  placeholder="Ingrese la cantidad"
                />
                </div>
                <div>
                <label
                  htmlFor="total"
                  className="block text-gray-700 text-sm font-medium"
                >
                  
                  Precio Unitario:
                </label>

                <input
                  type="number"
                  value={newUnitPrice}
                  onChange={handleInputChangeUnitPrince}
                  className="w-full h-10 p-4 border rounded-xl mr-5 "
                  placeholder="Ingrese la cantidad"
                />
                
                </div>
                
                <div>
                  
               <div className="mt-5 ">
               <label>venta</label>
               </div>
               <div>
                <select
                
                  name="saleId"
                  onChange={(e) => handleSelectChangeSale(e)}
                  value={newSaleId}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
                >
                  <option value="" disabled>
                    Selecciona una venta
                  </option>
                  {sale &&
                    sale.map((sale) => (
                      <option key={sale.id} value={sale.id}>
                        {sale.id}
                      </option>
                    ))}
                </select>
                <select
                  id="productId"
                  name="productId"
                  onChange={(e) => handleSelectChangePId(e)}
                  value={newProductId}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 ml-5 mr-5"
                >
                  <option value="" disabled>
                    Selecciona un Id
                  </option>
                  {products &&
                    products.map((products) => (
                      <option key={products.id} value={products.id}>
                        {products.name}
                      </option>
                    ))}
                </select>
                <div>
              
             
                </div>
                  
               
                </div>
                 
              </div>
              {/* <div className="mt-5">
               <label>producto</label>
               </div> */}
                </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 text-black bg-green-600 text-sm font-medium rounded-md"
                >
                  Guardar
                </button>
                <button
                  onClick={closeModal}
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md ml-2"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateSaleDetail;
