import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const colors = {
    white: "#FFFFFF",
    lightGray: "#F2F2F2",
    mediumGray: "#9E9E9E",
    darkGray: "#263238",
    black: "#000000",
    borderGray: "#E1E1E1",
    primary: "#407BEE",
    secondar: "#33569B",
    bluePill: "#407BFF",
    red: "#DF5753",
};

const text = StyleSheet.create({
    regular:{
        fontSize:16,
        fontWeight:"400",
        textAlign:"center",
        color: colors.mediumGray,
    },
    bold:{
        fontSize: 26,
        fontWeight:"bold",
        textAlign: "center",
        marginBottom: 15,
        color: colors.darkGray,
    },
    primaryText:{
        fontSize: 14,
        fontWeight:"bold",
        textTransform:'uppercase',
        color: colors.white,
        marginLeft: 40,
    },
    productName:{
        fontSize: 16,
        fontWeight:"bold",
    },
    currency:{
        fontSize: 16,
        fontWeight:"400",
        color: colors.mediumGray,
    },
    price:{
        fontSize: 30,
        color: colors.primary,
        fontWeight:"bold",
    },
    goBackText: {
        fontSize: 18,
        fontWeight: "bold",
        textTransform:"uppercase",
        color: colors.darkGray,
        marginLeft: 16,
    }, 
    productDetailsName: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.darkGray,
        marginTop:10,
    },
    scrollTextContainer:{
        marginVertical: 20,
        padding:20,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: colors.lightGray,
    },
    productDescription:{
        fontSize: 16,
        fontWeight:"400",
        color: colors.mediumGray,
    },

    //Login
    textInput:{
        width: 300,
        height:50,
        borderWidth:1,
        borderColor: colors.mediumGray,
        borderRadius: 10,
        padding:10,
        marginRight:-10

    },
    loginTitle:{
        fontSize: 30,
        color: colors.darkGray,
        textTransform: "uppercase",
        marginBottom: 80,
    },
    primaryTextLogin:{
        fontSize: 14,
        fontWeight:"bold",
        textTransform:'uppercase',
        color: colors.white,
        marginLeft: 80,
    },

    //Navbar
    logoutText:{
        color: colors.white,
    },

    //Admin/Products
    addButtonText:{
        color: colors.white,
        textTransform: "uppercase",
        fontWeight: "bold",
    },
    editText: {
        textTransform: "uppercase",
        fontWeight:"bold",
        color:colors.red,
    },
    deleteText:{
        textTransform: "uppercase",
        fontWeight:"bold",
        color:colors.mediumGray,
    },

    //Form Products

    uploadText: {
        color: colors.white,
        textTransform: "uppercase",
        fontWeight: "bold",
    },

    fileSize:{
        color: colors.primary,
        fontSize: 12,
        fontWeight: "300",
        marginVertical: 5,
        padding: 2,
    },
    salvarTextBtn:{
        textTransform: "uppercase",
        fontWeight: "bold",
        color: colors.white,
    }    
})


const theme = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    card: {
        width: "100%",
        height: "100%",
        backgroundColor: colors.white,
        borderRadius: 20,
        alignItems: "center",
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height:2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        justifyContent:"center",
    },
    draw: {
        width: 313,
        height: 225,
    },
    textContainer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    primaryButton: {
        backgroundColor: colors.primary,
        width: 290,
        height: 50,
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems:"center",
        borderRadius: 10,
    },
    arrowContainer:{
        backgroundColor: colors.secondar,
        width:50,
        height:50,
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        alignItems: "center",
        justifyContent: "center",

    },
    scroolContainer:{
        padding: 10,
    },
    productCard:{
        width: "100%",
        backgroundColor: colors.white,
        borderRadius: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height:2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignItems:"center",
        justifyContent:"space-around",
        marginVertical:10,
    },
    description:{
        width: "100%",
        padding: 20,
        borderTopColor: colors.lightGray,
        borderTopWidth: 1,
    },
    priceContainer: {
        flexDirection: "row",
        marginTop: 10,
    },    

    inputContainer: {
        width: "100%",
        height: 60,
        backgroundColor: colors.white,
        borderRadius: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height:2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignItems:"center",
        marginVertical: 12.5,
        paddingVertical:10,
    },
    searchInput:{
        width:"90%",
        height: 40,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.borderGray,
    },
    productImage:{
        width: 140,
        height: 140,
        margin: 16,
    },

    //ProductDetails

    containerDetails:{
        backgroundColor: colors.white,
        padding: 20,

    },
    detailsCard: {
        width: "100%",
        height: "100%",
        backgroundColor: colors.white,
        borderRadius: 20,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height:2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        justifyContent:"space-around",
        padding:20,
    },
    productImageContainer:{
        width:"100%",
        borderWidth: 1,
        borderColor:colors.lightGray,
        alignItems: "center",
        borderRadius: 20,
    },
    productImageDetails: {
        width:180, 
        height: 180,
    },
    goBackContainer: {
        width: 290,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        justifyContent: "flex-start",
    },
    //Loaders
    loader:{
        flexDirection:"row",
        justifyContent:"space-around",
        padding:10,
        flex: 1, 
     
    },

    //Login
    loginCard:{
        width: "100%",
        height: "100%",
        backgroundColor: colors.white,
        borderRadius: 20,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height:2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignItems: "center",
        justifyContent:"center",
    },
    form:{
        marginVertical: 10,
    },

    passwordContainer:{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 25,
    },
    toogle:{
        marginLeft:-20
    },
    eyes:{
        padding:14
    },
 
    
    //Admin Product Forms
    formContainer: {
        width: deviceWidth,
        padding: 20,
    },
    formCard: {
        width: "100%",
        height: "90%",
        backgroundColor: colors.white,
        borderRadius:20,
        padding:20,
        shadowColor:colors.black,
        shadowOffset:{
            width: 0,
            height: 2,
        },
        shadowOpacity:0.25,
        shadowRadius:3.84,
        alignItems:"center",
        justifyContent: "space-around",       
    },
    modalContainer: {
        width: deviceWidth,
        height: deviceHeight,
        backgroundColor: "#00000033",
        alignItems: "center",
        justifyContent: "center",
    },
    modalContent: {
        width: 300,
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50%",
        backgroundColor: colors.white,
        borderRadius:20,
        padding:20,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    modalItem:{
        width: "100%",
        backgroundColor: colors.lightGray,
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },

    formInput:{
        width: 280,
        height:50,
        borderWidth:1,
        borderColor: colors.mediumGray,
        borderRadius: 10,
        padding:10,
        marginVertical: 15,
    },
    textArea:{
        marginVertical: 15,
        borderRadius: 10,
        width: 280,
        paddingLeft: 10,
        paddingBottom: 200,
        borderWidth: 1,
        borderColor: colors.mediumGray,
    },
    selectInput:{
        width: 280,
        height:50,
        borderWidth:1,
        borderColor: colors.mediumGray,
        borderRadius: 10,
        padding:10,
        justifyContent: "center",
    },
    uploadBtn: {
        width: 280,
        height:40,
        backgroundColor: colors.mediumGray,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"  
    },
    saveBtn:{
        width:"45%",
        height: 40,
        marginLeft:-10,
        backgroundColor: colors.primary,
        borderWidth:1,
        marginVertical: 10,
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 10,
    },
    deleteBtnForm:{
        width:"45%",
        height: 40,
        borderColor: colors.red,
        borderWidth:1,
        marginVertical: 10,
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 10,
    }

    
    
});

const nav = StyleSheet.create({
    leftText: {
        color: colors.white,
        fontWeight:"bold",
        marginLeft:10,
    },
    drawer:{
        marginRight: 20,
    },
    options:{
        width: deviceWidth,
        height: 120,
        backgroundColor: colors.primary,
        marginTop: 125,
        marginRight: -20,
        padding: 20,
        justifyContent: "space-between",
    },
    option:{
        paddingVertical: 5,
    },
    textOption:{
        color:colors.white,
        textTransform: "uppercase",
       
    },
    textActive:{
        fontWeight: "bold",        
    },
    logoutBtn:{
        width: 60,
        height:30,
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 20,
    }
});

const tabbar = StyleSheet.create({

    container: {
        width: deviceWidth,
        height: 80,
        backgroundColor: colors.white,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },

    pill: {
        padding: 15,
        backgroundColor: colors.lightGray,
        borderRadius: 30,
    },
    pillActive:{
        backgroundColor: colors.primary,
    },
    pillText:{
        fontWeight:"bold",
        color: colors.mediumGray,
    },
    pillTextActive: {
        color: colors.lightGray,
    }

})

const admin = StyleSheet.create({
    container:{
        padding: 10,
        alignItems: "center"
    }, 
    addButton:{
        width:'100%',
        height: 50,
        backgroundColor: colors.primary,
        margin: 10,
        borderRadius: 10,
        alignItems:"center",
        justifyContent:"center",
    },
    buttonContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    deleteBtn:{
        width:"40%",
        height: 40,
        borderColor: colors.red,
        borderWidth:1,
        marginVertical: 10,
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 10,
    },
    editBtn:{
        width:"48%",
        height: 40,
        borderColor: colors.mediumGray,
        borderWidth:1,
        marginVertical: 10,
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 10,
    }
})

export { colors, theme, text, nav, tabbar, admin };
