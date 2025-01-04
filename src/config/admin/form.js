import { DefaultContext } from "react-icons";

const adminFormControl={
    category:[
        {
            type:'text',
            '_id':'name',
            label:'Name',
            placeholder:'Your category name'
        },
        {
            type:'file',
            '_id':'image',
            label:'Category image'
        },
        {
            type:'text',
            '_id':'description',
            label:'Description',
            placeholder:'Your description',
        }
    ],
    brand:[
        {
            type:'text',
            '_id':'name',
            label:'Name',
            placeholder:'Your category name'
        },
        {
            type:'file',
            '_id':'image',
            label:'Category image'
        },
        {
            type:'text',
            '_id':'description',
            label:'Description',
            placeholder:'Your description',
        }
    ],
    categoryTypical:[
        {
            type:'text',
            '_id':'name',
            label:'Name',
            placeholder:'Your category name'
        },
        {
            type:'text',
            '_id':'description',
            label:'Description',
            placeholder:'Your description',
        }
    ],
    staffInformation:[
        {
            type:"text",
            '_id':'salary',
            label:"Salary",
            placeholder:"Employee salary",
        }
    ],
    addStaff:[
        {
            type:"text",
            '_id':'fullName',
            label:"Full Name",
            placeholder:"Employee full name",
        },
        {
            type:"text",
            '_id':'userName',
            label:"User Name",
            placeholder:"Employee user name",
        },
        {
            type:"text",
            '_id':'email',
            label:"Email",
            placeholder:"Employee email",
        },
        {
            type:"text",
            '_id':'phone',
            label:"Phone",
            placeholder:"Employee phone",
        },
        {
            type:"text",
            '_id':'salary',
            label:"Salary",
            placeholder:"Employee salary",
        },
        {
            type:"text",
            '_id':'address',
            label:"Address",
            placeholder:"Employee address",
        },
    ],
};


export default adminFormControl;