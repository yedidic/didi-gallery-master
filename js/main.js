console.log('Starting up');

function init() {
  inflatePortfolio();
  // inflateModals();
}

function inflatePortfolio() {
  var projs = getProjects();
  var portfolioThumbnailsHtmls = projs.map(function (proj, idx) {
    return `
        <div class="col-md-4 col-sm-6 portfolio-item">
          <a class="portfolio-link" data-toggle="modal" onclick="updateModal(${idx})" href="#portfolioModal"  >
            <div class="portfolio-hover">
              <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
              </div>
            </div>
            <img class="img-fluid" src="img/portfolio/${proj.id}-thumbnail.png" alt="">
          </a>
          <div class="portfolio-caption">
            <h4>${proj.name}</h4>
            <p class="text-muted">${proj.labels[0]}</p>
          </div>
        </div>
        `;
  });

  $('#portfolio-thumbs-container').html(portfolioThumbnailsHtmls.join(''));
}

function inflateModals() {
  var projs = getProjects();

  // {
  //     id: 'pacman',
  //     name: 'Pacman',
  //     title: 'Better to not become meal',
  //     desc: 'Nice and not very ugly pacman game',
  //     url: 'projs/pacman',
  //     publishedAt: 1528539449,
  //     labels: ['Pacman', 'keyboard events'],
  // }
  var modalStrHtmls = projs.map(function (proj) {
    return `
        <!-- Modal -->
            <div class="portfolio-modal modal fade" id="portfolioModal${proj.id}" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content">
                <div class="close-modal" data-dismiss="modal">
                <div class="lr">
            <div class="rl"></div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="modal-body">
                <!-- Project Details Go Here -->
                <h2 id="modal-proj-name">${proj.name}</h2>
                <p class="item-intro text-muted">${proj.title}</p>
                <img class="img-fluid d-block mx-auto" src="img/portfolio/${proj.id}-full.png" alt="">
                <p>${proj.desc}</p>
                <ul class="list-inline">
                  <li>Date: ${getMonthName(proj.publishedAt)} ${getYearName(proj.publishedAt)}</li>
                  <li>Client: ${proj.client}</li>
                  <li>Category: ${proj.labels.join(' ')}</li>
                </ul>
                <button class="btn btn-primary" data-dismiss="modal" type="button">
                  <i class="fa fa-times"></i>
                  Close Project</button>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
        </div>
  
        `;
  });
  var elModalsContainer = document.querySelector('.modals-container');
  elModalsContainer.innerHTML = modalStrHtmls.join('');
}

function updateModal(idx) {
  // <h2 id="modal-proj-name">Project Name</h2>
  // <p id="modal-proj-title">class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
  // <img class="img-fluid d-block mx-auto" src="img/portfolio/01-full.jpg" alt="">
  // <p id="modal-proj-desc">Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis
  //   dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae
  //   cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
  // <ul class="list-inline">
  //   <li id="modal-proj-date">Date: January 2017</li>
  //   <li id="modal-proj-client">Client: Threads</li>
  //   <li id="modal-proj-cat">Category: Illustration</li>  
  var proj = getProjByIdx(idx);
  $('#modal-proj-name').text(proj.name);
  $('#modal-proj-title').text(proj.title);
  $('#modal-proj-img').attr('src', `img/portfolio/${proj.id}-full.png`);
  $('#modal-proj-desc').text(proj.desc);
  $('#modal-proj-date').text(`${getMonthName(proj.publishedAt)} ${getYearName(proj.publishedAt)}`);
  $('#modal-proj-client').text(proj.client);
  $('#modal-proj-cat').text(`${proj.labels.join(' ')}`);
}

function setHrefURL() {

  console.log('url here');

  var EMAIL_ADDRESS = $('#form-email-address').val();
  var SUBJECT = $('#form-subject').val();
  var BODY = $('#form-text-area').val();
  var url = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL_ADDRESS}&su=${SUBJECT}&body=${BODY}`;
  // console.log(url);

  document.querySelector('#send-gmail-a').href = url;
  console.log(document.querySelector('#send-gmail-a'));
  document.querySelector('#send-gmail-a').click();
  
}

