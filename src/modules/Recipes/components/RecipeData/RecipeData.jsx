import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCategories } from '../../../../api/modules/categories';
import { AddRecipes, getResipesById, getTagsResipes, updateResipesById } from '../../../../api/modules/resipes';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function RecipeData() {
  const navigate=useNavigate();
    const [categriesList, setCategriesList] = useState([]);
    const [tagsList, setTagsList] = useState([]);
    const [imageName, setImageName] = useState("");
    const { id } = useParams();
    const isEditMode = !!id;
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setImageName(file.name);
  }
};
      let { register, formState: { errors }, handleSubmit,reset } = useForm();
    
const getRecipeDetails = async (recipeId) => {
    try {
        const response = await getResipesById(recipeId);
        const recipe = response.data;
        reset({
            name: recipe.name,
            description: recipe.description,
            price: recipe.price,
            tagId: recipe.tag?.id,
            categoriesIds: recipe.category[0]?.id 
        });
        if (recipe.imagePath) {
            setImageName(recipe.imagePath);
        }
    } catch (error) {
        toast.error("Failed to load recipe data");
    }
};

  const appendToFormData=(data)=>{
    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("price",data.price);
    formData.append("description",data.description);
    formData.append("tagId",data.tagId);
    formData.append("categoriesIds",data.categoriesIds);
   if (data.recipeImage && data.recipeImage[0]) {
            formData.append("recipeImage", data.recipeImage[0]);
        }
return formData;
  }
   const onSubmit = async (data) => {
        let recipeData = appendToFormData(data)
        try {
            if (isEditMode) {
                await updateResipesById(id, recipeData);
                toast.success("Recipe Updated Successfully");
            } else {
                await AddRecipes(recipeData); 
                toast.success("Recipe Added Successfully");
            }
            navigate("/dashboard/recipes");
        } catch (error) {
          console.log(error)
            toast.error(isEditMode ? "Failed to update" : "Failed to add");
        }
    }
  const getCategriesList = async () => {
      try {
        const response = await getCategories();
        setCategriesList(response.data.data)
  
      } catch (error) {
         const msg = error.response?.data?.message || "Something went wrong!";
            toast.error(msg);
      }
    }
    const getTagsList = async () => {
      try {
        const response = await getTagsResipes();
       setTagsList(response.data)
  
      } catch (error) {
         const msg = error.response?.data?.message || "Something went wrong!";
            toast.error(msg);
      }
    }
useEffect(() => {
    const fetchData = async () => {
        await getCategriesList();
        await getTagsList();
        if (isEditMode) {
            getRecipeDetails(id);
        }
    };
    fetchData();
}, [id]);
  return (
    <>
    <div>
        <div className="container-fluid">
      <div className="row recipe-header rounded-3 justify-content-between align-items-center px-5 py-4 m-3">
        <div className="col-md-5 my-2">
          <h5>Fill the <span className=' text-success' >Recipes !</span></h5>
          <p className=' my-2'>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>

        </div>
        <div className="col-md-4  text-end ">
          <button onClick={()=>navigate('/dashboard/recipes')} className='btn text-white px-5 py-2'>All Recipes <i className='fa fa-arrow-right'></i></button>
        </div>
      </div>
       
    </div>
    <form className='w-75 m-auto p-3' onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group my-3">
         <input {...register('name', { required: "Faild is required" })} type="text" className="form-control border-0 my-1" placeholder="name " aria-label="Category Name " aria-describedby="basic-addon1" />
      </div>
      {errors.name && <span className='text-danger'>{errors.name?.message}</span>}
        <div className="input-group my-3">
        <select defaultValue="" {...register('tagId', { required: "Faild is required" })} className="form-control border-0 " placeholder="Categ" aria-describedby="basic-addon1" >
               <option value="" disabled hidden>Choose tags</option>
              {tagsList.map(tag=><option key={tag.id} value={tag.id}>{tag.name}</option>)}
            </select>
      </div>
           {errors.tagId  && <span className='text-danger'>{errors.tagId ?.message}</span>}
      <div className="input-group my-3">
         <input {...register('price', { required: "Faild is required" })} type="number" className="form-control border-0 my-1" placeholder="price " aria-label="price " aria-describedby="basic-addon1" />
      </div>
            {errors.price && <span className='text-danger'>{errors.price?.message}</span>}
        <div className="input-group my-3">
         <select {...register('categoriesIds', { required: "Faild is required" })} className="form-control border-0 " aria-describedby="basic-addon1" >
              <option value="" disabled hidden>Choose Category</option>
              {categriesList.map(category=><option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
      </div>
       {errors.categoriesIds && <span className='text-danger'>{errors.categoriesIds?.message}</span>}
       <div className="input-group my-3">
         <textarea {...register('description', { required: "Faild is required" })} type="text" className="form-control border-0 my-1" placeholder="description " aria-label="description " aria-describedby="basic-addon1" />
      </div>
          {errors.description && <span className='text-danger'>{errors.description?.message}</span>}
 <div className="upload-container my-3">
  <input 
    {...register('recipeImage', { 
      onChange: (e) => handleFileChange(e)
    })} 
    type="file" 
    id="recipe-image" 
    className="d-none" 
    accept="image/*"
  />
  
  <label 
    htmlFor="recipe-image" 
    className="upload-box p-3 d-flex flex-column align-items-center justify-content-center"
  >
    <i className="fa-solid fa-upload text-black fs-5 mb-1"></i>
    <p className="mb-0 text-center">
      {imageName ? (
        <span className="text-dark fw-bold">{imageName}</span>
      ) : (
        <>
          Drag & Drop or <span className="text-success">Choose a Item Image</span> to Upload
        </>
      )}
    </p>
  </label>
</div>
      <div className='d-flex justify-content-end '>
        <button onClick={()=>navigate('/dashboard/recipes')} className=' bg-white rounded-2 px-5 py-2 border-success mx-5'>Close</button>
        <button className='btn text-white px-4 py-2 mx-3'>Save</button>
        
      </div> 

    </form>
    </div>
  
    </>
  )
}
