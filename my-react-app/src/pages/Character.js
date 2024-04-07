const Character = () => {
  return (
    <div class="modal" id="CharacterModal">
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <div className="row mb-3">
              <div className="d-flex justify-content-center">
                <h2>Apple <span className="badge bg-dark ">LV.99</span></h2>
              </div>
            </div>

            <div className="row justify-content-center align-items-center">
              <div className="col-1 px-1"><span className="badge rounded-pill bg-danger">HP</span></div>
              <div class="col-8">
                <div class="progress">
                  <div class="progress-bar bg-danger" style={{ width: "70%" }}>70/100</div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center align-items-center">
              <div className="col-1 px-1"><span className="badge rounded-pill bg-warning">EXP</span></div>
              <div class="col-8">
                <div class="progress">
                  <div class="progress-bar bg-warning" style={{ width: "30%" }}>30/100</div>
                </div>
              </div>
            </div>

            <div className="row justify-content-center align-items-center my-2">
              <div className="col-9">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col"><span className="badge bg-dark">ATK</span></th>
                      <th scope="col"><span className="badge bg-dark">DEF</span></th>
                      <th scope="col"><span className="badge bg-danger">STR</span></th>
                      <th scope="col"><span className="badge bg-success">DEX</span></th>
                      <th scope="col"><span className="badge bg-warning">LCK</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>10</td>
                      <td>15</td>
                      <td>20</td>
                      <td>21</td>
                      <td>30</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="modal-footer">

          </div>

        </div>
      </div>
    </div>
  );
}

export default Character;