export const PAGES_MENU = [
  {
    path: 'assetdepdetails',
    data: {
      menu: {
        title: 'Amortizare',
        icon: 'fa fa-calculator'
      }
    },
    roles: 'administrator'
  },
  {
    path: 'dashboards',
    data: {
      menu: {
        title: 'Dashboard',
        icon: 'fa fa-tachometer'
      }
    },
    roles: 'user',
    children: [
      {
        path: 'inventory',
        data: {
          menu: {
            title: 'Inventories',
            icon: 'fa fa-barcode'
          }
        },
        roles: 'user'
      },
      {
        path: 'it',
        data: {
          menu: {
            title: 'IT',
            icon: 'fa fa-laptop'
          }
        },
        roles: 'user'
      },
      {
        path: 'nonit',
        data: {
          menu: {
            title: 'NON IT',
            icon: 'fa fa-bandcamp'
          }
        },
        roles: 'user'
      },
      {
        path: 'operation',
        data: {
          menu: {
            title: 'Transferuri',
            icon: 'fa fa-home'
          }
        },
        roles: 'user'
      },
      {
        path: 'erroremployee',
        data: {
          menu: {
            title: 'Erori angajati',
            icon: 'fa fa-home'
          }
        },
        roles: 'user'
      },
      {
        path: 'errorroom',
        data: {
          menu: {
            title: 'Erori zone',
            icon: 'fa fa-home'
          }
        },
        roles: 'user'
      },
    ]
  },
  {
    path: 'maps',
    data: {
      menu: {
        title: 'Harti',
        icon: 'fa fa-home'
      }
    },
    roles: 'administrator'
  },
  {
    path: 'assetinvdetails',
    data: {
      menu: {
        title: 'Fixed Assets',
        icon: 'fa fa-cubes',
      }
    },
    roles: 'user'
  },
  {
    path: 'assetcomponents',
    data: {
      menu: {
        title: 'Accessories',
        icon: 'fa fa-life-ring'
      }
    },
    roles: 'administrator',
  },
  {
    path: 'employees',
    data: {
      menu: {
        title: 'Employees',
        icon: 'fa fa-user'
      }
    },
    roles: 'administrator'
  },
  {
    path: 'syncstatus',
    data: {
      menu: {
        title: 'SOFI upload',
        icon: 'fa fa-user'
      }
    },
    roles: 'administrator'
  },
  {
    path: 'employeevalidates',
    data: {
      menu: {
        title: 'Employee validates',
        icon: 'fa fa-star'
      }
    },
    roles: 'administrator'
  },
  {
    path: 'itemvalidates',
    data: {
      menu: {
        title: 'Item validates',
        icon: 'fa fa-star'
      }
    },
    roles: 'administrator'
  },
  {
    path: 'inventory',
    data: {
      menu: {
        title: 'Inventories',
        icon: 'fa fa-calendar'
      }
    },
    roles: 'administrator',
    children: [
      {
        path: 'filter',
        data: {
          menu: {
            title: 'State',
            icon: 'fa fa-bar-chart'
          }
        },
        roles: 'administrator',
      },
       {
        path: 'reports',
        data: {
          menu: {
            title: 'Reports',
            icon: 'fa fa-barcode'
          }
        },
        roles: 'administrator',
      }
    ]
  },



  //

  {
    path: 'nomenclatures',
    data: {
      menu: {
        title: 'Nomenclatures',
        icon: 'fa fa-calendar'
      }
    },
    roles: 'administrator',
    children: [
      {
        path: 'lists',
        data: {
          menu: {
            title: 'Inventory',
            icon: 'fa fa-barcode'
          }
        },
        roles: 'administrator',
      },
      {
        path: 'months',
        data: {
          menu: {
            title: 'Luna contabila',
            icon: 'fa fa-barcode'
          }
        },
        roles: 'administrator',
      },
        {
        path: 'invstates',
        data: {
          menu: {
            title: 'Asset States',
            icon: 'fa fa-tags'
          }
        },
        roles: 'administrator',
      },
       {
        path: 'assetstates',
        data: {
          menu: {
            title: 'Operation Types',
            icon: 'fa fa-tags'
          }
        },
        roles: 'administrator',
      },
      {
        path: 'zonestates',
        data: {
          menu: {
            title: 'Status',
            icon: 'fa fa-tags'
          }
        },
        roles: 'administrator',
      },
      {
        path: 'admcenters',
        data: {
          menu: {
            title: 'Asset Types',
            icon: 'fa fa-institution'
          }
        },
        roles: 'administrator'
      },
        {
        path: 'mastertypes',
        data: {
          menu: {
            title: 'Master Types',
            icon: 'fa fa-institution'
          }
        },
        roles: 'administrator'
      },
        {
        path: 'models',
        data: {
          menu: {
            title: 'Models',
            icon: 'fa fa-institution'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'brands',
        data: {
          menu: {
            title: 'Brands',
            icon: 'fa fa-institution'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'insurancecategories',
        data: {
          menu: {
            title: 'Insurance Categories',
            icon: 'fa fa-institution'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'projects',
        data: {
          menu: {
            title: 'Projects',
            icon: 'fa fa-institution'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'intercompanies',
        data: {
          menu: {
            title: 'InterCompanies',
            icon: 'fa fa-institution'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'companies',
        data: {
          menu: {
            title: 'It / Non-It',
            icon: 'fa fa-institution'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'types',
        data: {
          menu: {
            title: 'Types',
            icon: 'fa fa-institution'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'subtypes',
        data: {
          menu: {
            title: 'SubTypes',
            icon: 'fa fa-institution'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'countries',
        data: {
          menu: {
            title: 'Country',
            icon: 'fa fa-institution'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'counties',
        data: {
          menu: {
            title: 'County',
            icon: 'fa fa-institution'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'cities',
        data: {
          menu: {
            title: 'Cities',
            icon: 'fa fa-institution'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'regions',
        data: {
          menu: {
            title: 'Locations',
            icon: 'fa fa-institution'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'locations',
        data: {
          menu: {
            title: 'Buildings',
            icon: 'fa fa-building-o'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'rooms',
        data: {
          menu: {
            title: 'Zones',
            icon: 'fa fa-star'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'divisions',
        data: {
          menu: {
            title: 'Categories',
            icon: 'fa fa-star'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'dictionarytypes',
        data: {
          menu: {
            title: 'Items Type',
            icon: 'fa fa-star'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'dictionaryitems',
        data: {
          menu: {
            title: 'Items',
            icon: 'fa fa-star'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'administrations',
        data: {
          menu: {
            title: 'Budget Line',
            icon: 'fa fa-star'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'costcenters',
        data: {
          menu: {
            title: 'CostCenters',
            icon: 'fa fa-institution'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'departments',
        data: {
          menu: {
            title: 'N + 1',
            icon: 'fa fa-users',
          }
        },
        roles: 'administrator'
      },
      {
        path: 'dimensions',
        data: {
          menu: {
            title: 'Run Change',
            icon: 'fa fa-folder'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'partners',
        data: {
          menu: {
            title: 'Partners',
            icon: 'fa fa-truck'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'partnerlocations',
        data: {
          menu: {
            title: 'Partner Locations',
            icon: 'fa fa-truck'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'assetnatures',
        data: {
          menu: {
            title: 'Asset Natures',
            icon: 'fa fa-folder'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'budgetmanagers',
        data: {
          menu: {
            title: 'Budget Manager',
            icon: 'fa fa-folder'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'accounts',
        data: {
          menu: {
            title: 'Accounts',
            icon: 'fa fa-folder'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'expaccounts',
        data: {
          menu: {
            title: 'Expense accounts',
            icon: 'fa fa-folder'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'articles',
        data: {
          menu: {
            title: 'Articles',
            icon: 'fa fa-folder'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'assettypes',
        data: {
          menu: {
            title: 'Asset Types',
            icon: 'fa fa-folder'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'uoms',
        data: {
          menu: {
            title: 'OS',
            icon: 'fa fa-folder'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'assetclasses',
        data: {
          menu: {
            title: 'Classes',
            icon: 'fa fa-folder'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'assetcategories',
        data: {
          menu: {
            title: 'Groups',
            icon: 'fa fa-share-alt'
          }
        },
        roles: 'administrator',
      },

    ]
  },
  {
    path: 'emailtypes',
    data: {
      menu: {
        title: 'Email settings',
        icon: 'fa fa-envelope'
      }
    },
    roles: 'administrator'
  },
  // {
  //   path: 'emailmanagers',
  //   data: {
  //     menu: {
  //       title: 'Email Manager',
  //       icon: 'fa fa-star'
  //     }
  //   },
  //   roles: 'administrator'
  // },
  {
    path: 'emailmanagers',
    data: {
      menu: {
        title: 'Email status',
        icon: 'fa fa-address-book-o'
      }
    },
    roles: 'administrator'
  },

  //
    {
    path: 'operations',
    data: {
      menu: {
        title: 'Operations',
        icon: 'fa fa-exchange'
      }
    },
    roles: 'user',
  },
  {
    path: 'identity',
    data: {
      menu: {
        title: 'Admin Panel',
        icon: 'fa fa-key'
      }
    },
    roles: 'administrator'
  },
  {
    path: 'config',
    data: {
      menu: {
        title: 'Settings',
        icon: 'fa fa-cog'
      }
    },
    roles: 'administrator',
    children: [
      {
        path: 'global',
        data: {
          menu: {
            title: 'Global',
            icon: 'fa fa-globe'
          }
        },
        roles: 'administrator'
      },
      {
        path: 'tables',
        data: {
          menu: {
            title: 'Tabels',
            icon: 'fa fa-table'
          }
        },
        roles: 'administrator'
      }
    ]
  }
];

// export const PAGES_MENU = [
//   {
//     path: 'assetdepdetails',
//     data: {
//       menu: {
//         title: 'Amortizare',
//         icon: 'fa fa-calculator'
//       }
//     },
//     roles: 'administrator'
//   },
//   {
//     path: 'assetinvdetails',
//     data: {
//       menu: {
//         title: 'Mijloace fixe',
//         icon: 'fa fa-cubes',
//       }
//     },
//     roles: 'administrator'
//   },
//   {
//     path: 'inventory',
//     data: {
//       menu: {
//         title: 'Inventariere',
//         icon: 'fa fa-calendar'
//       }
//     },
//     roles: 'administrator',
//     children: [
//       {
//         path: 'filter',
//         data: {
//           menu: {
//             title: 'Situatii',
//             icon: 'fa fa-bar-chart'
//           }
//         }
//       },
//        {
//         path: 'reports',
//         data: {
//           menu: {
//             title: 'Rapoarte',
//             icon: 'fa fa-barcode'
//           }
//         }
//       },
//       {
//         path: 'lists',
//         data: {
//           menu: {
//             title: 'Inventare',
//             icon: 'fa fa-barcode'
//           }
//         }
//       },
//         {
//         path: 'invstates',
//         data: {
//           menu: {
//             title: 'Stari',
//             icon: 'fa fa-tags'
//           }
//         }
//       }
//     ]
//   },
//   {
//     path: 'admcenters',
//     data: {
//       menu: {
//         title: 'AssetTypes',
//         icon: 'fa fa-institution'
//       }
//     },
//     roles: 'administrator'
//   },
//   {
//     path: 'costcenters',
//     data: {
//       menu: {
//         title: 'CostCenters',
//         icon: 'fa fa-institution'
//       }
//     },
//     roles: 'administrator'
//   },
//   {
//     path: 'locations',
//     data: {
//       menu: {
//         title: 'Buildings',
//         icon: 'fa fa-building-o'
//       }
//     },
//     roles: 'administrator'
//   },
//   {
//     path: 'rooms',
//     data: {
//       menu: {
//         title: 'CostCenters',
//         icon: 'fa fa-star'
//       }
//     },
//     roles: 'administrator'
//   },
//   {
//     path: 'employees',
//     data: {
//       menu: {
//         title: 'Employees',
//         icon: 'fa fa-user'
//       }
//     },
//     roles: 'administrator'
//   },
//   {
//     path: 'departments',
//     data: {
//       menu: {
//         title: 'Departamente',
//         icon: 'fa fa-users',
//       }
//     },
//     roles: 'administrator'
//   },
//   {
//     path: 'partners',
//     data: {
//       menu: {
//         title: 'Furnizori',
//         icon: 'fa fa-truck'
//       }
//     },
//     roles: 'administrator'
//   },
//   {
//     path: 'assetclasses',
//     data: {
//       menu: {
//         title: 'Clasificari',
//         icon: 'fa fa-folder'
//       }
//     },
//     roles: 'administrator'
//   },
//   {
//     path: 'assetcategories',
//     data: {
//       menu: {
//         title: 'AssetCategories',
//         icon: 'fa fa-share-alt'
//       }
//     },
//     roles: 'administrator',
//   },
//     {
//     path: 'operations',
//     data: {
//       menu: {
//         title: 'Transferuri',
//         icon: 'fa fa-share-alt'
//       }
//     },
//     roles: 'administrator',
//   },
//   {
//     path: 'identity',
//     data: {
//       menu: {
//         title: 'Administrare',
//         icon: 'fa fa-key'
//       }
//     },
//     roles: 'administrator'
//   },
//   {
//     path: 'config',
//     data: {
//       menu: {
//         title: 'Configurare',
//         icon: 'fa fa-cog'
//       }
//     },
//     roles: 'administrator',
//     children: [
//       {
//         path: 'global',
//         data: {
//           menu: {
//             title: 'Global',
//             icon: 'fa fa-globe'
//           }
//         },
//         roles: 'administrator'
//       },
//       {
//         path: 'tables',
//         data: {
//           menu: {
//             title: 'Tabele',
//             icon: 'fa fa-table'
//           }
//         },
//         roles: 'administrator'
//       }
//     ]
//   }
// ];



// export const PAGES_MENU = [
//   {
//     path: 'pages',
//     children: [
//       {
//         path: 'dashboard',
//         data: {
//           menu: {
//             title: 'Dashboard',
//             icon: 'ion-android-home',
//             selected: false,
//             expanded: false,
//             order: 0
//           }
//         }
//       },
//       {
//         path: 'editors',
//         data: {
//           menu: {
//             title: 'Editors',
//             icon: 'ion-edit',
//             selected: false,
//             expanded: false,
//             order: 100,
//           }
//         },
//         children: [
//           {
//             path: 'ckeditor',
//             data: {
//               menu: {
//                 title: 'CKEditor',
//               }
//             }
//           }
//         ]
//       },
//       {
//         path: 'components',
//         data: {
//           menu: {
//             title: 'Components',
//             icon: 'ion-gear-a',
//             selected: false,
//             expanded: false,
//             order: 250,
//           }
//         },
//         children: [
//           {
//             path: 'treeview',
//             data: {
//               menu: {
//                 title: 'Tree View',
//               }
//             }
//           }
//         ]
//       },
//       {
//         path: 'charts',
//         data: {
//           menu: {
//             title: 'Charts',
//             icon: 'ion-stats-bars',
//             selected: false,
//             expanded: false,
//             order: 200,
//           }
//         },
//         children: [
//           {
//             path: 'chartist-js',
//             data: {
//               menu: {
//                 title: 'Chartist.Js',
//               }
//             }
//           }
//         ]
//       },
//       {
//         path: 'ui',
//         data: {
//           menu: {
//             title: 'UI Features',
//             icon: 'ion-android-laptop',
//             selected: false,
//             expanded: false,
//             order: 300,
//           }
//         },
//         children: [
//           {
//             path: 'typography',
//             data: {
//               menu: {
//                 title: 'Typography',
//               }
//             }
//           },
//           {
//             path: 'buttons',
//             data: {
//               menu: {
//                 title: 'Buttons',
//               }
//             }
//           },
//           {
//             path: 'icons',
//             data: {
//               menu: {
//                 title: 'Icons',
//               }
//             }
//           },
//           {
//             path: 'modals',
//             data: {
//               menu: {
//                 title: 'Modals',
//               }
//             }
//           },
//           {
//             path: 'grid',
//             data: {
//               menu: {
//                 title: 'Grid',
//               }
//             }
//           },
//         ]
//       },
//       {
//         path: 'forms',
//         data: {
//           menu: {
//             title: 'Form Elements',
//             icon: 'ion-compose',
//             selected: false,
//             expanded: false,
//             order: 400,
//           }
//         },
//         children: [
//           {
//             path: 'inputs',
//             data: {
//               menu: {
//                 title: 'Form Inputs',
//               }
//             }
//           },
//           {
//             path: 'layouts',
//             data: {
//               menu: {
//                 title: 'Form Layouts',
//               }
//             }
//           }
//         ]
//       },
//       {
//         path: 'tables',
//         data: {
//           menu: {
//             title: 'Tables',
//             icon: 'ion-grid',
//             selected: false,
//             expanded: false,
//             order: 500,
//           }
//         },
//         children: [
//           {
//             path: 'basictables',
//             data: {
//               menu: {
//                 title: 'Basic Tables',
//               }
//             }
//           },
//           {
//             path: 'smarttables',
//             data: {
//               menu: {
//                 title: 'Smart Tables',
//               }
//             }
//           }
//         ]
//       },
//       {
//         path: 'maps',
//         data: {
//           menu: {
//             title: 'Maps',
//             icon: 'ion-ios-location-outline',
//             selected: false,
//             expanded: false,
//             order: 600,
//           }
//         },
//         children: [
//           {
//             path: 'googlemaps',
//             data: {
//               menu: {
//                 title: 'Google Maps',
//               }
//             }
//           },
//           {
//             path: 'leafletmaps',
//             data: {
//               menu: {
//                 title: 'Leaflet Maps',
//               }
//             }
//           },
//           {
//             path: 'bubblemaps',
//             data: {
//               menu: {
//                 title: 'Bubble Maps',
//               }
//             }
//           },
//           {
//             path: 'linemaps',
//             data: {
//               menu: {
//                 title: 'Line Maps',
//               }
//             }
//           }
//         ]
//       },
//       {
//         path: '',
//         data: {
//           menu: {
//             title: 'Pages',
//             icon: 'ion-document',
//             selected: false,
//             expanded: false,
//             order: 650,
//           }
//         },
//         children: [
//           {
//             path: ['/login'],
//             data: {
//               menu: {
//                 title: 'Login'
//               }
//             }
//           },
//           {
//             path: ['/register'],
//             data: {
//               menu: {
//                 title: 'Register'
//               }
//             }
//           }
//         ]
//       },
//       {
//         path: '',
//         data: {
//           menu: {
//             title: 'Menu Level 1',
//             icon: 'ion-ios-more',
//             selected: false,
//             expanded: false,
//             order: 700,
//           }
//         },
//         children: [
//           {
//             path: '',
//             data: {
//               menu: {
//                 title: 'Menu Level 1.1',
//                 url: '#'
//               }
//             }
//           },
//           {
//             path: '',
//             data: {
//               menu: {
//                 title: 'Menu Level 1.2',
//                 url: '#'
//               }
//             },
//             children: [
//               {
//                 path: '',
//                 data: {
//                   menu: {
//                     title: 'Menu Level 1.2.1',
//                     url: '#'
//                   }
//                 }
//               }
//             ]
//           }
//         ]
//       },
//       {
//         path: '',
//         data: {
//           menu: {
//             title: 'External Link',
//             url: 'http://akveo.com',
//             icon: 'ion-android-exit',
//             order: 800,
//             target: '_blank'
//           }
//         }
//       }
//     ]
//   }
// ];
