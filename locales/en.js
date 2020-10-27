const en = {
  login: 'Login',
  clientName: 'Client Name',
  email: 'Email Address',
  passcode: 'Passcode',
  password: 'Password',
  confirmPassword: 'Confirm Password',
  logout: 'Logout',
  refreshed: 'Refreshed',
  general: {
    noData: 'No data'
  },
  menu: {
    home: 'Home',
    tables: 'Tables',
    orders: 'Orders',
    orderDisplay: 'Order Display',
    reservations: 'Reservations',
    reporting: 'Reporting',
    settings: 'Settings',
    clientUsers: 'Client Users',
    timecard: 'Time Card'
  },
  settings: {
    account: 'Account',
    stores: 'Store Settings',
    products: 'Products',
    staff: 'Staff',
    workingArea: 'Printer/Working Area',
    language: 'Language',
    tableLayouts: 'Table Layouts',
    manageShifts: 'Manage Shift',
    announcements: 'Announcements',
    manageOffers: 'Manage Offers',
    preferences: 'Preferences',
    eInvoice: 'E-invoice'
  },
  newItem: {
    new: 'New',
    product: 'Product',
    category: 'Category',
    printer: 'Printer',
    workingArea: 'Working Area',
    productOption: 'Product Option',
  },
  action: {
    ok: 'OK',
    done: 'Done',
    enter: 'Enter',
    save: 'Save',
    search: 'Search',
    update: 'Update',
    cancel: 'Cancel',
    delete: 'Delete',
    prepare: 'Prepared',
    confirmMessageTitle: 'Confirm Action',
    confirmMessage: 'Are you sure?',
    yes: 'Yes',
    no: 'No',
    unpin: 'Unpin',
    pin: 'Pin',
    activate: 'Activate',
    deactivate: 'Deactivate'
  },
  // ==== domain specific ====
  keyboardAction: {
    clean: 'Clean',
    ok: 'Done',
    back: 'Back',
  },
  product: {
    ungrouped: 'Ungrouped',
    pinned: 'Pinned',
  },
  order: {
    inStore: 'In Store',
    IN_STORE: 'In Store',
    takeOut: 'Take Out',
    TAKE_OUT: 'Take Out',

    ordersTitle: 'Orders',
    fromDate: 'From ',
    toDate: 'To ',
    orderId: 'Order Id',
    date: 'Date',
    orderStatusLong: 'Order Status',
    orderStatus: 'Order status',
    noOrder: 'No Order',

    orderDetailsTitle: 'Order Details',
    serviceCharge: 'Service Charge',
    discount: 'Discount',
    total: 'Final Total',
    paymentMethod: 'Payment Method',
    staff: 'Staff',
    ageGroup: 'Age Group',
    visitedFrequency: 'Visited Frequency',
    notFilledIn: 'Not Filled',
    orderStartDate: 'Start Date',
    lineItemCreatedDate: 'Date',
    preparationDuration: 'Order Preparation',
    endDate: 'End Date',
    duration: 'Total Duration',
    product: 'Product',
    quantity: 'Qty',
    unitPrice: 'U/P',
    subtotal: 'Subtotal',
    lineState: 'State',
    serveBy: 'Serve By',
    copiedFrom: 'Copy From',
    freeLineitem: 'Free',
    cancelFreeLineitem: 'Not Free',

    // order specific actions
    liveOrders: 'Receive Live Orders',
    copyOrder: 'Copy Order',

    // order messages
    submitted: 'Order Submitted',
    deleted: 'Order Deleted',
    copied: 'Order Copied',
    free: 'Price is updated',
    cancelFree: 'Price is updated',
    mergeOrderTitle: 'Merge Order',
    mergeOrderMsg: 'Proceed with merging order line items?',
  },
  orderState: {
    OPEN: 'Open',
    IN_PROCESS: 'In Process',
    DELIVERED: 'Delivered',
    SETTLED: 'Settled',
    REFUNDED: 'Refunded',
    COMPLETED: 'Completed',
    DELETED: 'Deleted',
    CANCELLED: 'Cancelled',
    OTHERS: 'Empty'
  },
  orderLog: {
    title: 'Order Logs',
    updateOrder: 'Update Order Info',
    stateChange: 'Change state',
    addOrderLineItem: 'Add Item',
    updateOrderLineItem: 'Update Item',
    deleteOrderLineItem: 'Delete Item',
    deliverLineItems: 'Deliver Line Item(s)',
    waiveServiceCharge: 'Waive Service Charge',
    applyOrderDiscount: 'Order Discount',
    removeOrderDiscount: 'Remove Order Discount',
    copyOrder: 'Copy Order',
    deleteOrder: 'Delete Order'
  },
  invoiceStatus: {
    invoiceStatus: 'Invoice status',
    CREATED: 'Created',
    MIG_CREATED: 'Uploading',
    PROCESSED: 'Processed',
    CANCELLED: 'Cancelled',
    VOID: 'Void',
    cancelInvoice: 'Cancel invoice'
  },
  payment: {
    cashPayment: 'Cash',
    cardPayment: 'Credit Card',
    paymentTitle: 'Payment',
    orderOptions: 'Order Options',
    waiveServiceCharge: 'Waive Service Charge',
    resetAllOffers: 'Reset All Offers',
    payOrder: 'Pay',
    paid: 'Paid',
    change: 'Change',
    remainder: 'Remainder',
    CardNo: 'Last 4 Digits',
    cardType: 'Card Type',
    taxIDNumber: 'Tax ID Number',
    enterTaxIDNumber: 'Enter Tax ID Number',
    ok: 'Done',
    cancel: 'Cancel',
    charged: 'Payment charged',
    discountOptions: 'Discount Options',
    checkTaxIDNumber: 'Enter Correct Tax ID Number',
    checkAutoComplete: 'Entered cash amount is less than the settling amount. Do you want to make up the difference automatically?',
  },
  timecard: {
    hours: 'Hour(s)',
    minutes: 'Minute(s)'
  },
  shift: {
    closeShift: 'Close Shift',
    status: {
      INACTIVE: 'Inactive',
      ACTIVE: 'Active',
      CLOSING: 'Closing',
      CONFIRM_CLOSE: 'Confirm Closing',
      BALANCED: 'Balanced',
      UNBALANCED: 'Unbalanced'
    },
    staff: 'Staff',
    shiftSummary: 'Closing Account Summaries',
    totalCashIncome: 'Total Cash Income',
    totalCreditCardIncome: 'Total Card Income',
    totalClosingAmount: 'Total Closing Amount',
    invoicesTitle: 'Invoices',
    totalInvoices: 'Total Number of Orders',
    deletedOrders: 'Total Number Of Orders Deleted',
    totalDiscounts: 'Total Amount Of Discount',
    totalServiceCharge: 'Total Service Charge',
    closingRemark: 'Closing Remark',
    confirmAction: 'Confirm Close',
    abortAction: 'Abort Close',
    accountCloseTitle: 'Closing Account',
    confirmCloseTitle: 'Confirm Closing Account Details',
    cashSection: 'Cash',
    cardSection: 'Credit Card',
    nextAction: 'Next',
    closingStatus: 'Status',
    startingCash: 'Starting Cash',
    totalCashTransitionAmt: 'Total Cash Transactions',
    totalCashInRegister: 'Actual Cash Amount',
    enterAmount: 'Enter Amount',
    remark: 'Unbalance Reason',
    totalCardTransitionAmt: 'Total Card Transactions',
    totalCardInRegister: 'Actual Card Amount',
    difference: 'Difference',

    // messages
    shiftOpened: 'Shift opened',
    shiftAborted: 'Closing shift aborted',
    shiftClosed: 'Shift closed'
  },
  preferences: {
    darkMode: 'Dark Mode'
  },
  // ==== component specific ====
  monthPicker: {
    month: 'Month',
    year: 'Year',
    monthRange1to2: 'January - February',
    monthRange3to4: 'March - April',
    monthRange5to6: 'May - June',
    monthRange7to8: 'July - August',
    monthRange9to10: 'September - October',
    monthRange11to12: 'November - December',
  },
  datetimeRange: {
    pickerTitle: 'Select a date time',
    select: 'Ok'
  },
  errors: {
    required: 'Required field',
    email: 'Email field',
    clientPassword: 'Password rule: at least one uppercase character, one digit and minimum length of 6 characters',
    confirmPassword: 'Please enter the same password',
    percentage: 'A percentage must be between 1 and 100',
    moreThanZero: 'Choose at least 1',
    balanceError: 'Please enter a positive value',
    loginFailed: 'Login failed',
    requireFourDigits: 'Please enter 4 digits number',
    requireTwoUppercaseLetters: 'Please enter 2 uppercase letter',
    requireNDigitsNumber: `Please enter {{n}} digits number`,
  },
  backend: {
    POST: 'Saved',
    PATCH: 'Saved',
    DELETE: 'Deleted',
    403: 'You are not authorized for this operation.',
    404: 'The id you used to look for an item cannot be found.',
    message: {
      insufficientCashAmount: 'Entered cash amount is less than the settling amount.',
      discountedTotalLessThanZero: 'Discounted amount cannot be less than zero',
      completeAllOrdersFirst: 'Please complete all orders before closing shift.',
      userRoleInUse: 'This user role is used by existing user',
      unableToChangeState: 'Unable to change order state',
      alreadyExists: 'Name is already used',
      categoryInUse: 'This category is already in use',
      workingAreaInUse: 'This working area is already in use',
      printerHasWorkingArea: 'This printer is used by working area',
      optionInUse: 'This option is already in use',
    }
  },
  eInvoice: {
    eInvoiceStatusTitle: 'E-invoice Number',
    nowEinvoiceStatus: 'Status now',
    rangeIdentifier: 'Invoice period',
    rangeFrom: 'Invoice start number',
    rangeTo: 'Invoice end number',
    remainingInvoiceNumbers: 'Number of remaining',
    viewAllInvoice: 'View all invoice',
    ubn: 'UBN',
    setUBN: 'Set UBN',
    AES_KEY: 'Seed Password',
    setAES_KEY: 'Set Seed Password',
    invoice: 'Invoice',
    setInvoice: 'Set Invoice',
    eInvoiceTitle: 'E-invoice Number',
    prefixYear: 'Prefix Year',
    prefixMonth: 'Prefix Month',
    prefix: 'Invoice Prefix',
  },
  bar: 'Bar {{someValue}}',
  printerSuccess: 'Print Success',
  printerWarning: 'Print Failure',
  splittingCheck: 'There is an existing split bill, would you like to start a new split bill?',
  splitBill: {
    SpiltBillScreenTitle: 'Spilt Bill',
    ConfirmCancelMessage: 'Confirm to cancel split bill?',
    nothing: 'Nothing',
    parentOrder: 'Original Bill',
    splitOrder: 'Split Bill'
  },
  productOption: 'Product Option',
  printWorkingOrder: 'Print work order',
  printOrderDetails: 'Print order details',
  quickCheckoutPrint: 'Print work order?',
  orderFilterForm: {
    searchByDateAndTable: 'Search by date and table name',
    searchByInvoice: 'Search by invoice number',
    tablePlaceholder: 'Enter table name'
  }
}

export default en
