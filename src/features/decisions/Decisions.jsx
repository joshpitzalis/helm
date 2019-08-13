import React from "react";

const propTypes = {};

const defaultProps = {};

export default function Decisions(props) {
  return (
    <section class="ecommerce_16 bg-light pt-100 pb-70">
      <div class="container px-xl-0">
        <div class="row">
          <div class="col-lg-3" />
          <div class="col-xl-8 col-lg-9 d-flex flex-wrap justify-content-between align-items-baseline">
            <div class="color-heading f-14 semibold text-uppercase sp-20 total">
              3 Items
            </div>
            <div class="sort_by">
              <span class="color-heading f-14 semibold text-uppercase sp-20">
                Sort by{" "}
              </span>
              <div class="d-inline-block dropdown">
                <a
                  href="#"
                  class="link color-main f-14 semibold text-uppercase sp-20 dropdown-toggle"
                  id="ecommerce_16_dropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  New arrival
                </a>
                <div
                  class="ml-0 bg-light px-0 pt-15 pb-15 radius16 dropdown-menu dropdown-menu-right"
                  aria-labelledby="ecommerce_16_dropdown"
                >
                  <div class="py-1 px-15 link_holder">
                    <a href="#" class="link color-heading">
                      New arrival
                    </a>
                  </div>
                  <div class="py-1 px-15 link_holder">
                    <a href="#" class="link color-heading">
                      Size
                    </a>
                  </div>
                  <div class="py-1 px-15 link_holder">
                    <a href="#" class="link color-heading">
                      Price Up
                    </a>
                  </div>
                  <div class="py-1 px-15 link_holder">
                    <a href="#" class="link color-heading">
                      Price Down
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* meetingse */}
        <div class="row">
          <div class="mt-15 mb-30 mb-lg-0 col-lg-3 f-18 medium text-center text-lg-left categories">
            <div class="mt-10 d-inline-block d-lg-block category">
              <a href="#" class="link color-heading lh-30">
                Jackets &amp; Coats
              </a>
            </div>
            <div class="mt-10 d-inline-block d-lg-block category">
              <a href="#" class="link color-heading lh-30">
                Hoodies
              </a>
            </div>
            <div class="mt-10 d-inline-block d-lg-block category">
              <a href="#" class="link color-heading lh-30">
                T-shirts &amp; Vests
              </a>
            </div>
            <div class="mt-10 d-inline-block d-lg-block category">
              <a href="#" class="link color-heading lh-30">
                Shirts
              </a>
            </div>
            <div class="mt-10 d-inline-block d-lg-block category">
              <a href="#" class="link color-heading lh-30">
                Blazers &amp; Suits
              </a>
            </div>
            <div class="mt-10 d-inline-block d-lg-block category">
              <a href="#" class="link color-heading lh-30">
                Jeans
              </a>
            </div>
            <div class="mt-10 d-inline-block d-lg-block category">
              <a href="#" class="link color-heading lh-30">
                Trousers
              </a>
            </div>
            <div class="mt-10 d-inline-block d-lg-block category">
              <a href="#" class="link color-heading lh-30">
                Shorts
              </a>
            </div>
            <div class="mt-10 d-inline-block d-lg-block category">
              <a href="#" class="link color-heading lh-30">
                Underwear
              </a>
            </div>
            <div class="mt-10 d-inline-block d-lg-block category">
              <a href="#" class="link color-heading lh-30">
                Gift Sets
              </a>
            </div>
          </div>
          <div class="mt-20 col-xl-8 col-lg-9 products">
            <div class="row">
              {[1, 2, 3, 4].map(item => (
                <div class="mb-30 mx-auto col-md-12 d-flex flex-wrap align-items-stretch justify-content-between product">
                  <img
                    srcset="i/ecommerce_16_product_1@2x.jpg 2x"
                    src="i/ecommerce_16_product_1.jpg"
                    alt=""
                    class="align-self-start flex-shrink-0 img-fluid radius10 img"
                  />
                  <div class="ml-30 w-470 pt-10 pb-10 d-flex flex-column justify-content-between inner">
                    <div class="top">
                      <div class="d-flex flex-column-reverse flex-md-row align-items-baseline justify-content-between">
                        <h4 class="f-32 bold">Slim Fit Denim Shorts</h4>
                        <div class="ml-15 flex-shrink-0 f-14 sp-20 semibold action-2 price">
                          $12.99
                        </div>
                      </div>
                      <div class="mt-10 color-heading text-adaptive">
                        Regular waist, zip fly with button, and slim legs with
                        sewn cuffs at hemsz
                      </div>
                    </div>
                    <div class="my-4 d-flex flex-wrap color_size middle">
                      <div class="mr-25">
                        <div class="f-14 semibold text-uppercase sp-20 color-heading">
                          Color
                        </div>
                      </div>
                      <div>
                        <div class="pl-3 f-14 semibold text-uppercase sp-20 color-heading">
                          Size
                        </div>
                        <select
                          name="sizes"
                          class="pl-3 pr-5 input sm border-gray medium"
                        >
                          <option>31</option>
                          <option>32</option>
                          <option>33</option>
                          <option>34</option>
                        </select>
                      </div>
                    </div>
                    <div class="d-flex flex-wrap align-items-center bottom">
                      <a href="#" class="mr-20 btn sm action-1 f-16 medium">
                        Add to bag
                      </a>
                      <a href="#" class="link color-heading f-18 medium">
                        Add to Wishlist
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Decisions.propTypes = propTypes;
Decisions.defaultProps = defaultProps;
