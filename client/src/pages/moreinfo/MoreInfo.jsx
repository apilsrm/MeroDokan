import CommonPage from "../commonPages/CommonPage"
import AboutImg from "../../assest/image.png"


const MoreInfo = () => {
  return (
   <>
    <CommonPage 
    title="More-Info"
    subtitle="MoreAbout"
    desc="What is MeroPasal?
    MeroPasal is an e-commerce site that sells a wide variety of products. We source our products from all over the world, and we only work with suppliers who share our commitment to quality.
    Why should I shop with MeroPasal?
    There are many reasons why you should shop with MeroPasal. Here are just a few:
    We offer a wide variety of products.
    We source our products from all over the world, so you can find the best deals on the products you want."
    
    desc1=" We only work with suppliers who share our commitment to quality.
    We offer free shipping on orders over Rs.3000 within the Kathmandu Valley.
    We offer a 30-day return policy on valid products, so you can be sure that you are making a purchase that you are happy with.
    We have a dedicated customer service team that is available to help you with any questions or concerns you may have.
    We hope you enjoy shopping with MeroPasal!."
    btnAbout="Explore services"
    imgAbout={AboutImg}
    visit=""
    
    />
   </>
  )
}

export default MoreInfo
