'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">server documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AllocationModule.html" data-type="entity-link" >AllocationModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AllocationModule-a6712a8256e78441d159ae157d5166b60da48fa363b06eebef21588999be28149d7ba4bb30154fdaedb96ecbbfa3591031569dfca4b1af23f06a538adcb8e5a7"' : 'data-target="#xs-injectables-links-module-AllocationModule-a6712a8256e78441d159ae157d5166b60da48fa363b06eebef21588999be28149d7ba4bb30154fdaedb96ecbbfa3591031569dfca4b1af23f06a538adcb8e5a7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AllocationModule-a6712a8256e78441d159ae157d5166b60da48fa363b06eebef21588999be28149d7ba4bb30154fdaedb96ecbbfa3591031569dfca4b1af23f06a538adcb8e5a7"' :
                                        'id="xs-injectables-links-module-AllocationModule-a6712a8256e78441d159ae157d5166b60da48fa363b06eebef21588999be28149d7ba4bb30154fdaedb96ecbbfa3591031569dfca4b1af23f06a538adcb8e5a7"' }>
                                        <li class="link">
                                            <a href="injectables/AllocationRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AllocationRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AllocationService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AllocationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CustomerModule.html" data-type="entity-link" >CustomerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CustomerModule-8a5957d2084088db781153ea74be41bdab648827f949cd3446a0f229f5db04470b8fc66c855e0f7a436f1f6612ee4986bbd0e060240603de2ebdf930b8ca31be"' : 'data-target="#xs-injectables-links-module-CustomerModule-8a5957d2084088db781153ea74be41bdab648827f949cd3446a0f229f5db04470b8fc66c855e0f7a436f1f6612ee4986bbd0e060240603de2ebdf930b8ca31be"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CustomerModule-8a5957d2084088db781153ea74be41bdab648827f949cd3446a0f229f5db04470b8fc66c855e0f7a436f1f6612ee4986bbd0e060240603de2ebdf930b8ca31be"' :
                                        'id="xs-injectables-links-module-CustomerModule-8a5957d2084088db781153ea74be41bdab648827f949cd3446a0f229f5db04470b8fc66c855e0f7a436f1f6612ee4986bbd0e060240603de2ebdf930b8ca31be"' }>
                                        <li class="link">
                                            <a href="injectables/CustomerRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomerRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CustomerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Allocation.html" data-type="entity-link" >Allocation</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Customer.html" data-type="entity-link" >Customer</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Allocation.html" data-type="entity-link" >Allocation</a>
                            </li>
                            <li class="link">
                                <a href="classes/AllocationExistsInput.html" data-type="entity-link" >AllocationExistsInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/AllocationNameExistsInput.html" data-type="entity-link" >AllocationNameExistsInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/AllocationResolver.html" data-type="entity-link" >AllocationResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAllocationInput.html" data-type="entity-link" >CreateAllocationInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCustomerInput.html" data-type="entity-link" >CreateCustomerInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/Customer.html" data-type="entity-link" >Customer</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomerResolver.html" data-type="entity-link" >CustomerResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteAllocationInput.html" data-type="entity-link" >DeleteAllocationInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllocationInput.html" data-type="entity-link" >GetAllocationInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAllocationsInput.html" data-type="entity-link" >GetAllocationsInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetCustomerByUsernameInput.html" data-type="entity-link" >GetCustomerByUsernameInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetCustomerInput.html" data-type="entity-link" >GetCustomerInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAllocationInput.html" data-type="entity-link" >UpdateAllocationInput</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AllocationService.html" data-type="entity-link" >AllocationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomerService.html" data-type="entity-link" >CustomerService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});