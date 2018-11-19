const parcelOrders = [
  {
    id: 1,
    senderName: 'Abiola Balogun',
    senderEmail: 'Abiola@gmail.com',
    senderId: '123abi3',
    receiverName: 'Busola',
    receiverEmail: 'busola@gmail.com',
    itemName: '12 Bags of cement',
    itemWeight: 5,
    price: 3000,
    pickupLocation: {
      address: '23 , Bisi olatunji street Ojodu Berger',
      coordinates: [
        1.2,
        3.4,
      ],
    },
    destinationLocation: {
      address: 'Andela Towers Ikorudu',
      coordinates: [
        9.2,
        3.4,
      ],
    },
    orderDate: '03-09-2018',
    estimatedDeliveryDate: '04-09-2018',
    isDestinationChangedByAdmin: true,
    status: 'delivered',
  },

  {
    id: 2,
    senderName: 'Akeem Korede',
    senderEmail: 'Akeem@gmail.com',
    senderId: '463acp4',
    receiverName: 'Busola',
    receiverEmail: 'buso@gmail.com',
    itemName: '12 karet Diamonds',
    itemWeight: 5,
    price: 3000,
    pickupLocation: {
      address: 'Aso rock Abuja',
      coordinates: [
        1.3,
        1.7,
      ],
    },
    destinationLocation: {
      address: 'Silver Bird Cinemas Yaba',
      coordinates: [
        1.3,
        2.5,
      ],
    },
    orderDate: '03-09-2018',
    estimatedDeliveryDate: '04-09-2018',
    isDestinationChangedByAdmin: false,
    status: 'cancelled',
  },

  {
    id: 3,
    senderName: 'Xrole dialond',
    senderEmail: 'xrole@gmail.com',
    senderId: '193abi9',
    receiverName: 'shola',
    receiverEmail: 'shola@gmail.com',
    itemName: '12 pieces of shampo',
    itemWeight: 5,
    price: 7000,
    pickupLocation: {
      address: '23 , Bisi olatunji street Ojodu Berger',
      coordinates: [
        1.2,
        3.4,
      ],
    },
    destinationLocation: {
      address: 'Andela Towers Ikorudu',
      coordinates: [
        9.2,
        3.4,
      ],
    },
    orderDate: '03-09-2018',
    estimatedDeliveryDate: '04-09-2018',
    isDestinationChangedByAdmin: false,
    status: 'pending',
  },

];

export default parcelOrders;
