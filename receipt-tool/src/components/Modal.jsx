import { useGlobalContext } from "../context"

const Modal = () => {

    const {selectedMeal, closeModal} = useGlobalContext()
    const {strMealThumb:image, strMeal:title, strInstructions:text, strSource:source} = selectedMeal
    return (
        <aside className="modal-overlay">
            <div className="modal-container">
                <h1>{selectedMeal.strMeal}</h1>
                <img src={image} alt={title} className="img modal-img"></img>
                <div>
                    <h4>{title}</h4>
                    <p>Cooking Instruction</p>
                    <p>{text}</p>
                    <a href={source} target="_blank">Original Source</a>

                    <div className="button-container">
                        <button className="btn btn-hipster close-btn" onClick={closeModal}>close</button>
                    </div>
                </div>  
            </div>
        </aside>
    )
}
export default Modal 