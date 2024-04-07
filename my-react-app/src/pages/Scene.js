import React, { useState } from 'react';

const Scene = () => {
  const [scene, setScene] = useState({
    name: '起始之村',
    description: 'Designed by photographeeasia / Freepik',
    image: 'images/village2.svg',
    option: ['旅館', '鐵匠舖', '道具店', '銀行', '教會', '村長之家'],
  });

  const optionList = scene.option.map((option, index) => {
    return (
      <li key={index} class="list-group-item">{option}</li>
    )
  })

  return (
    <section className="bg-secondary">
      <div className="container px-4 py-3">
        <div className='row justify-content-center'>
          <div className='col-8 border border-3'>
            <div className='row px-2 p-3'>
              <div className='row'>
                <h3>{scene.name}</h3>
              </div>
              <div className='row'>
                <img className="img-fluid home-img " src={scene.image} alt={scene.name} />
                <figcaption class="figure-caption text-end"><small>{scene.description}</small></figcaption>
              </div>

              <div className='row pt-2'>
                <ul class="list-group list-group-horizontal justify-content-center">
                  {optionList}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};

export default Scene;