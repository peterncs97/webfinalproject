import CharacterInfo from "./CharacterInfo";

const CharacterModal = () => {
  return (
    <div className="modal" id="CharacterModal">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div className="modal-body">
            <CharacterInfo />
          </div>

          <div className="modal-footer">

          </div>

        </div>
      </div>
    </div>
  );
}

export default CharacterModal;