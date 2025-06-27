  fetch('config.json')
    .then(res => res.json())
    .then(config => {
      // Set title & meta
      document.title = config.site.title;
      document.querySelector("link[rel='icon']").href = config.site.favicon;
      document.querySelector("meta[name='description']").setAttribute("content", config.site.metaDescription);

      // Set navbar logo and color
      const logo = document.querySelector(".navbar-brand img");
      if (logo) {
        logo.src = config.navbar.logo;
      }

      document.querySelector(".navbar-brand h1").style.color = config.navbar.brandColor;

      // Carousel
      document.querySelector(".carousel-caption-1-content h4").textContent = config.carousel.subtitle;
      document.querySelector(".carousel-caption-1-content h1:nth-of-type(1)").textContent = config.carousel.titleMain;
      document.querySelector(".carousel-caption-1-content h1:nth-of-type(2)").textContent = config.carousel.titleSub;

      const featureLines = config.carousel.features.map(f =>
        `<i class="bi bi-check-square text-primary me-2"></i>${f}`
      ).join(" ");

      document.querySelectorAll(".carousel-caption-1-content p").forEach((p, i) => {
        p.innerHTML = featureLines.split('</i>').slice(i * 3, (i + 1) * 3).join('</i>') + '</i>';
      });

      // Features
      const featureContainer = document.querySelector(".feature .row");
      featureContainer.innerHTML = config.features.map(f => `
        <div class="col-md-6 col-lg-6 col-xl-3">
          <div class="feature-item p-4">
            <div class="feature-icon mb-3"><i class="${f.icon} text-white fa-3x"></i></div>
            <a class="h4 mb-3">${f.title}</a>
            <p class="mb-3">${f.desc}</p>
          </div>
        </div>
      `).join("");

      // ROI
      const roiLeft = document.querySelectorAll(".service-item.rounded")[0].parentElement;
      roiLeft.innerHTML = config.roi.slice(0, 3).map(r => `
        <div class="service-item rounded p-4 mb-4">
          <div class="row">
            <div class="col-12">
              <div class="d-flex">
                <div class="service-content text-end">
                  <a class="h4 d-inline-block mb-3">${r.title}</a>
                  <p class="mb-0">${r.desc}</p>
                </div>
                <div class="ps-4"><div class="service-btn"><i class="${r.icon} text-white fa-2x"></i></div></div>
              </div>
            </div>
          </div>
        </div>
      `).join("");

      const roiRight = document.querySelectorAll(".service-item.rounded")[3].parentElement;
      roiRight.innerHTML = config.roi.slice(3).map(r => `
        <div class="service-item rounded p-4 mb-4">
          <div class="row">
            <div class="col-12">
              <div class="d-flex">
                <div class="pe-4"><div class="service-btn"><i class="${r.icon} text-white fa-2x"></i></div></div>
                <div class="service-content">
                  <a class="h4 d-inline-block mb-3">${r.title}</a>
                  <p class="mb-0">${r.desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `).join("");

    });
