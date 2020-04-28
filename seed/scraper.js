// install puppeteer if you ever need to re-scrape
const puppeteer = require("puppeteer");
const fs = require("fs");

const arr = [
  "https://www.houseplantsexpert.com/hippeastrum-amaryllis.html",
  "https://www.houseplantsexpert.com/african-violet-care-information.html",
  "https://www.houseplantsexpert.com/angel-wing-begonia.html",
  "https://www.houseplantsexpert.com/barberton-daisy.html",
  "https://www.houseplantsexpert.com/beach-spider-lily.html",
  "https://www.houseplantsexpert.com/growing-belladonna-lily-plants-indoors.html",
  "https://www.houseplantsexpert.com/bird-of-paradise-plant.html",
  "https://www.houseplantsexpert.com/blushing-bromeliad.html",
  "https://www.houseplantsexpert.com/busy-lizzie.html",
  "https://www.houseplantsexpert.com/growing-calla-lilly-plants-indoors-and-care.html",
  "https://www.houseplantsexpert.com/coral-berry-plant.html",
  "https://www.houseplantsexpert.com/cattleya-corsage-orchids.html",
  "https://www.houseplantsexpert.com/cyclamen-persicum.html",
  "https://www.houseplantsexpert.com/eternal-flame-calathea-crocata.html",
  "https://www.houseplantsexpert.com/false-shamrock-plant.html",
  "https://www.houseplantsexpert.com/flamingo-flower.html",
  "https://www.houseplantsexpert.com/flaming-sword-bromeliad.html",
  "https://www.houseplantsexpert.com/flowering-maple.html",
  "https://www.houseplantsexpert.com/kaffir-lily.html",
  "https://www.houseplantsexpert.com/lollipop-plant.html",
  "https://www.houseplantsexpert.com/lycaste-orchid.html",
  "https://www.houseplantsexpert.com/madagascar-jasmine.html",
  "https://www.houseplantsexpert.com/tillandsia-caput-medusae.html",
  "https://www.houseplantsexpert.com/moth-orchid.html",
  "https://www.houseplantsexpert.com/ornamental-pepper-plant.html",
  "https://www.houseplantsexpert.com/peace-lily-plant.html",
  "https://www.houseplantsexpert.com/poinsettia-plant.html",
  "https://www.houseplantsexpert.com/poison-primrose.html",
  "https://www.houseplantsexpert.com/queens-tears-plant.html",
  "https://www.houseplantsexpert.com/rose-of-china.html",
  "https://www.houseplantsexpert.com/bromeliad-scarlet-star.html",
  "https://www.houseplantsexpert.com/paphiopedlium-slipper-orchid.html",
  "https://www.houseplantsexpert.com/the-one-colored-paphiopedilum-concolor.html",
  "https://www.houseplantsexpert.com/urn-plant.html",
  "https://www.houseplantsexpert.com/winter-cherry-plant.html",
  "https://www.houseplantsexpert.com/aluminum-plant.html",
  "https://www.houseplantsexpert.com/areca-palm.html",
  "https://www.houseplantsexpert.com/arrowhead-plant.html",
  "https://www.houseplantsexpert.com/birds-nest-fern.html",
  "https://www.houseplantsexpert.com/boston-fern-care-indoors.html",
  "https://www.houseplantsexpert.com/broadleaf-lady-palm.html",
  "https://www.houseplantsexpert.com/canary-island-date-palm.html",
  "https://www.houseplantsexpert.com/cast-iron-plant.html",
  "https://www.houseplantsexpert.com/chinese-evergreen.html",
  "https://www.houseplantsexpert.com/coral-bead-plant.html",
  "https://www.houseplantsexpert.com/dracaena-corn-plant.html",
  "https://www.houseplantsexpert.com/growing-a-creeping-fig-indoors.html",
  "https://www.houseplantsexpert.com/cretan-brake-fern.html",
  "https://www.houseplantsexpert.com/codiaeum-variegatum.html",
  "https://www.houseplantsexpert.com/dumb-cane-plant.html",
  "https://www.houseplantsexpert.com/amazon-elephants-ear-plant.html",
  "https://www.houseplantsexpert.com/european-fan-palm.html",
  "https://www.houseplantsexpert.com/fiddle-leaf-fig.html",
  "https://www.houseplantsexpert.com/golden-pothos-plant.html",
  "https://www.houseplantsexpert.com/green-velvet-alocasia.html",
  "https://www.houseplantsexpert.com/hawaiian-ti-plant.html",
  "https://www.houseplantsexpert.com/caladium-heart-of-jesus.html",
  "https://www.houseplantsexpert.com/heartleaf-philodendron.html",
  "https://www.houseplantsexpert.com/kentia-palm.html",
  "https://www.houseplantsexpert.com/lucky-bamboo-plant.html",
  "https://www.houseplantsexpert.com/madagascar-dragon-tree.html",
  "https://www.houseplantsexpert.com/delta-maidenhair-fern.html",
  "https://www.houseplantsexpert.com/mexican-fortune-tree.html",
  "https://www.houseplantsexpert.com/parlor-palm.html",
  "https://www.houseplantsexpert.com/peacock-plant-calathea-makoyana.html",
  "https://www.houseplantsexpert.com/pin-stripe-calathea-ornata.html",
  "https://www.houseplantsexpert.com/pygmy-date-palm.html",
  "https://www.houseplantsexpert.com/rabbits-foot-fern.html",
  "https://www.houseplantsexpert.com/rattlesnake-plant.html",
  "https://www.houseplantsexpert.com/rose-painted-calathea.html",
  "https://www.houseplantsexpert.com/rubber-plant.html",
  "https://www.houseplantsexpert.com/sago-palm.html",
  "https://www.houseplantsexpert.com/sentry-palm.html",
  "https://www.houseplantsexpert.com/dracaena-song-of-india-plant.html",
  "https://www.houseplantsexpert.com/spider-plant.html",
  "https://www.houseplantsexpert.com/swiss-cheese-plant.html",
  "https://www.houseplantsexpert.com/umbrella-plant.html",
  "https://www.houseplantsexpert.com/venus-fly-trap-plant.html",
  "https://www.houseplantsexpert.com/wandering-jew-plant.html",
  "https://www.houseplantsexpert.com/weeping-fig.html",
  "https://www.houseplantsexpert.com/zebra-plant.html",
  "https://www.houseplantsexpert.com/calathea-zebrina.html",
  "https://www.houseplantsexpert.com/zz-plant.html",
  "https://www.houseplantsexpert.com/aloe-vera-house-plant.html",
  "https://www.houseplantsexpert.com/argyroderma-testiculare.html",
  "https://www.houseplantsexpert.com/baby-rubber-plant-peperomia-obtusifolia.html",
  "https://www.houseplantsexpert.com/bunny-ear-cactus.html",
  "https://www.houseplantsexpert.com/century-plant.html",
  "https://www.houseplantsexpert.com/christmas-cactus.html",
  "https://www.houseplantsexpert.com/christmas-cheer-sedum-rubrotinctum.html",
  "https://www.houseplantsexpert.com/coral-cactus.html",
  "https://www.houseplantsexpert.com/donkeys-tail-plant.html",
  "https://www.houseplantsexpert.com/easter-cactus.html",
  "https://www.houseplantsexpert.com/housetree-leek-aeonium-arboreum.html",
  "https://www.houseplantsexpert.com/flaming-katy.html",
  "https://www.houseplantsexpert.com/goats-horn-cactus.html",
  "https://www.houseplantsexpert.com/golden-barrel-cactus.html",
  "https://www.houseplantsexpert.com/jade-plant.html",
  "https://www.houseplantsexpert.com/jelly-beans-plant.html",
  "https://www.houseplantsexpert.com/lithops-fulleri.html",
  "https://www.houseplantsexpert.com/lithops-optica-rubra.html",
  "https://www.houseplantsexpert.com/mother-in-laws-tongue.html",
  "https://www.houseplantsexpert.com/mother-of-thousands-bryophyllum-daigremontianum.html",
  "https://www.houseplantsexpert.com/orchid-cactus.html",
  "https://www.houseplantsexpert.com/panda-plant.html",
  "https://www.houseplantsexpert.com/peperomia-puteolata.html",
  "https://www.houseplantsexpert.com/peruvian-apple-cactus.html",
  "https://www.houseplantsexpert.com/peperomia-ferreyrae.html",
  "https://www.houseplantsexpert.com/rat-tail-cactus.html",
  "https://www.houseplantsexpert.com/tiger-jaws-faucaria-tigrina.html",
  "https://www.houseplantsexpert.com/trailing-jade.html",
  "https://www.houseplantsexpert.com/lithops-pseudotruncatella.html",
  "https://www.houseplantsexpert.com/watermelon-peperomia.html",
  "https://www.houseplantsexpert.com/zebra-haworthia.html",
];

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

puppeteer.launch({ headless: true }).then(async (browser) => {
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 926 });
  const plants = [];

  asyncForEach(arr, async (link) => {
    await page.goto(link);

    // get plant details
    let plantData = await page.evaluate(() => {
      let plant = {};
      try {
        plant.commonName = document
          .querySelectorAll(".table")[0]
          .querySelector("tbody > tr:nth-child(2) > td:nth-child(2)")
          .innerText.split(".")[0];
      } catch (exception) {}
      try {
        plant.scientificName = document.querySelector("h1").innerText;
      } catch (exception) {}
      try {
        plant.image =
          // document.querySelector("div.col-md-12 img").src ||
          document.querySelector(".img-responsive").src;
      } catch (exception) {}
      try {
        plant.light = document
          .querySelectorAll(".table")[1]
          .querySelector("tbody > tr:nth-child(2) > td:nth-child(2)").innerText;
      } catch (exception) {}
      try {
        plant.watering = document
          .querySelectorAll(".table")[1]
          .querySelector("tbody > tr:nth-child(3) > td:nth-child(2)").innerText;
      } catch (exception) {}
      try {
        plant.soil = document
          .querySelectorAll(".table")[1]
          .querySelector("tbody > tr:nth-child(4) > td:nth-child(2)").innerText;

        // plant.watering: document.querySelector("div:nth-child(11) > div.row.row-code > div > table > tbody > tr:nth-child(3) > td:nth-child(2)")
      } catch (exception) {}
      return plant;
    });
    console.dir(plantData);
    plants.push(plantData);
  }).then(() => {
    fs.writeFile("./seed/plants.json", JSON.stringify(plants), (err) =>
      err ? console.log(err) : null
    );
    console.dir(plants, "saved plants json");
  });
});
