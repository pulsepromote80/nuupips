import { FiEdit2 } from 'react-icons/fi';



export const Columns = [
   

   {
    field: "serialNumber",
    header: "S.No",
    sortable: false,
    width: "8%",
    render: (rowData, actions, index) => {
        return (
            <div className="text-center w-full">
                {index + 1}
            </div>
        );
    }
},
{
    field: "name",
    header: "Name",
    sortable: true,
    width: "20%",
    render: (rowData) => (
        <div style={{ 
            textAlign: 'center',
            width: '100%',
            padding: '8px 0' // Optional: better spacing
        }}>
            {rowData.name}
        </div>
    )
}
    ,
    {
    field: "email",
    header: "Email",
    sortable: true,
    width: "20%",
    render: (rowData) => (
        <div style={{ 
            textAlign: 'center',
            width: '100%'
        }}>
            {rowData.email}
        </div>
    )
},
 {
    field: "comment",
    header: "Comment",
    sortable: true,
    width: "20%",
    render: (rowData) => {
        const comment = rowData.comment || '';
        const truncated = comment.length > 20 ? comment.substring(0, 20) + '...' : comment;
        
        return (
            <span title={comment} style={{ textAlign: 'center', display: 'block' }}>
                {truncated}
            </span>
        );
    }
},
 {
    field: "createdDate",
    header: "Created Date",
    sortable: true,
    width: "20%",
    render: (rowData) => (
        <div style={{ 
            textAlign: 'center',
            width: '100%'
        }}>
            {rowData.createdDate}
        </div>
    )
},

    

];

