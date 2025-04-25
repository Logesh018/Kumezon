// import React from 'react'
// import { motion } from "framer-motion";
// import { Trash, Star } from "lucide-react";
// import { useProductStore } from "../stores/useProductStore";

// const ProductsList = () => {
//   const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

//   return (
//     <motion.div
//       className='bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto'
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8 }}
//     >
//       <table className=' min-w-full divide-y divide-gray-700'>
//         <thead className='bg-gray-700'>
//           <tr>
//             <th
//               scope='col'
//               className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
//             >
//               Product
//             </th>
//             <th
//               scope='col'
//               className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
//             >
//               Price
//             </th>
//             <th
//               scope='col'
//               className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
//             >
//               Category
//             </th>

//             <th
//               scope='col'
//               className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
//             >
//               Featured
//             </th>
//             <th
//               scope='col'
//               className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
//             >
//               Actions
//             </th>
//           </tr>
//         </thead>

//         <tbody className='bg-gray-800 divide-y divide-gray-700'>
//           {products?.map((product) => (
//             <tr key={product._id} className='hover:bg-gray-700'>
//               <td className='px-6 py-4 whitespace-nowrap'>
//                 <div className='flex items-center'>
//                   <div className='flex-shrink-0 h-10 w-10'>
//                     <img
//                       className='h-10 w-10 rounded-full object-cover'
//                       src={product.image}
//                       alt={product.name}
//                     />
//                   </div>
//                   <div className='ml-4'>
//                     <div className='text-sm font-medium text-white'>{product.name}</div>
//                   </div>
//                 </div>
//               </td>
//               <td className='px-6 py-4 whitespace-nowrap'>
//                 <div className='text-sm text-gray-300'>₹{product.price.toFixed(2)}</div>
//               </td>
//               <td className='px-6 py-4 whitespace-nowrap'>
//                 <div className='text-sm text-gray-300'>{product.category}</div>
//               </td>
//               <td className='px-6 py-4 whitespace-nowrap'>
//                 <button
//                   onClick={() => toggleFeaturedProduct(product._id)}
//                   className={`p-1 rounded-full ${product.isFeatured ? "bg-yellow-400 text-gray-900" : "bg-gray-600 text-gray-300"
//                     } hover:bg-yellow-500 transition-colors duration-200`}
//                 >
//                   <Star className='h-5 w-5' />
//                 </button>
//               </td>
//               <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
//                 <button
//                   onClick={() => deleteProduct(product._id)}
//                   className='text-red-400 hover:text-red-300'
//                 >
//                   <Trash className='h-5 w-5' />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </motion.div>
//   );
// };

// export default ProductsList



import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash, Star, Pencil, Upload } from 'lucide-react';
import { useProductStore } from '../stores/useProductStore';


const ProductsList = () => {
  const {
    deleteProduct,
    toggleFeaturedProduct,
    products,
    updateProduct,
  } = useProductStore();

  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        price: editingProduct.price,
        category: editingProduct.category,
        description: editingProduct.description || '',
        image: editingProduct.image || '',
      });
    }
  }, [editingProduct]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result, // base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(editingProduct._id, formData);
    setEditingProduct(null);
  };

  return (
    <div className="relative">
      <motion.div
        className='bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <table className='min-w-full divide-y divide-gray-700'>
          <thead className='bg-gray-700'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Product</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Price</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Category</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Featured</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-gray-800 divide-y divide-gray-700'>
            {products?.map((product) => (
              <tr key={product._id} className='hover:bg-gray-700'>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0 h-10 w-10'>
                      <img className='h-10 w-10 rounded-full object-cover' src={product.image} alt={product.name} />
                    </div>
                    <div className='ml-4'>
                      <div className='text-sm font-medium text-white'>{product.name}</div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-300'>₹{product.price.toFixed(2)}</div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-300'>{product.category}</div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <button
                    onClick={() => toggleFeaturedProduct(product._id)}
                    className={`p-1 rounded-full ${product.isFeatured ? 'bg-yellow-400 text-gray-900' : 'bg-gray-600 text-gray-300'} hover:bg-yellow-500 transition-colors duration-200`}
                  >
                    <Star className='h-5 w-5' />
                  </button>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2'>
                  <button
                    onClick={() => setEditingProduct(product)}
                    className='text-blue-400 hover:text-blue-300'
                  >
                    <Pencil className='h-5 w-5' />
                  </button>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className='text-red-400 hover:text-red-300'
                  >
                    <Trash className='h-5 w-5' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Inline Edit Modal */}
      {editingProduct && (
        <div className='absolute top-0 left-0 w-full h-full backdrop-blur-md z-50 flex items-start justify-center overflow-y-auto py-10'>
          <div className='bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md'>
            <h2 className='text-xl font-bold mb-4 text-emerald-400 text-center'>Update Product</h2>
            <form onSubmit={handleEditSubmit} className='space-y-4'>

              <div>
                <label className='block text-sm font-medium text-gray-300 mb-1'>Product Name</label>
                <input
                  className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-emerald-500 focus:border-emerald-500'
                  required
                  name='name'
                  placeholder='Enter product name'
                  value={formData.name}
                  onChange={handleEditChange}
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-300 mb-1'>Price</label>
                <input
                  className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-emerald-500 focus:border-emerald-500'
                  required
                  name='price'
                  type='number'
                  placeholder='Enter price'
                  value={formData.price}
                  onChange={handleEditChange}
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-300 mb-1'>Category</label>
                <input
                  className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-emerald-500 focus:border-emerald-500'
                  required
                  name='category'
                  placeholder='Enter category'
                  value={formData.category}
                  onChange={handleEditChange}
                />
              </div>

              <div className='mt-1 flex items-center'>
  <input
    type='file'
    id='edit-image'
    className='sr-only'
    accept='image/*'
    onChange={handleEditImageChange}
  />
  <label
    htmlFor='edit-image'
    className='cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
  >
    <Upload className='h-5 w-5 inline-block mr-2' />
    Upload Image
  </label>
  {formData.image?.startsWith('data:image') && (
  <span className='ml-3 text-sm text-gray-400'>Image uploaded</span>
)}

</div>



              <div>
                <label className='block text-sm font-medium text-gray-300 mb-1'>Description</label>
                <textarea
                  className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-emerald-500 focus:border-emerald-500'
                  required
                  name='description'
                  placeholder='Enter description'
                  value={formData.description}
                  onChange={handleEditChange}
                />
              </div>

              <div className='flex justify-end gap-2'>
                <button
                  type='button'
                  onClick={() => setEditingProduct(null)}
                  className='px-4 py-2 bg-gray-300 text-black rounded'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 bg-blue-600 text-white rounded'
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



    </div>
  );
};

export default ProductsList;
