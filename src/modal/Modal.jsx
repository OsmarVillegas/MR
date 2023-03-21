import "../style/Admin/modalAdmin.css"

const Modal = ({ isOpen, onClose, children }) => {
    return(
        <div className="modal-container" style={{display: isOpen ? 'grid' : 'none'}}>
            <div className="modal-body">
                <button className="modal-close" onClick={onClose}><i class="fa-sharp fa-solid fa-circle-xmark circleMark"></i></button>
                {children}
            </div>
        </div>
    )
}

export default Modal;