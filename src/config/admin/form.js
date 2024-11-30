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
};


export default adminFormControl;