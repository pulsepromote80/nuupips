import { FiEdit2 } from 'react-icons/fi';



export const Columns = [
    {
    field: "actions",
    header: "Action", // Header center
    sortable: false,
    width: "10%",
    render: (rowData, actions, index) => {
        const isActive = rowData.status === "Active";
        return actions ? (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', // Center horizontally
                alignItems: 'center', // Center vertically
                width: '100%',
                height: '100%'
            }}>
                <button
                    onClick={() => actions.onEdit(rowData, index)}
                    style={{
                        padding: '6px 12px',
                        backgroundColor: '#3B82F6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3B82F6'}
                >
                    <FiEdit2 size={14} />
                   
                </button>
            </div>
        ) : null;
    }
},

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
    field: "categoryName",
    header: "Category Name",
    sortable: true,
    width: "20%",
    render: (rowData) => (
        <div style={{ 
            textAlign: 'center',
            width: '100%',
            padding: '8px 0' // Optional: better spacing
        }}>
            {rowData.categoryName}
        </div>
    )
}
    ,
    {
    field: "fullName",
    header: "Full Name",
    sortable: true,
    width: "20%",
    render: (rowData) => (
        <div style={{ 
            textAlign: 'center',
            width: '100%'
        }}>
            {rowData.fullName}
        </div>
    )
},
{
    field: "status",
    header: "Status",
    sortable: true,
    width: "15%",
    render: (rowData) => {
        const isActive = rowData.status === "Active";
        return (
            <div style={{ 
                display: 'flex',
                justifyContent: 'center', // Center horizontally
                alignItems: 'center', // Center vertically
                width: '100%',
                height: '100%'
            }}>
                {isActive ? (
                    <span style={{
                        color: '#10B981',
                        backgroundColor: '#D1FAE5',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        display: 'inline-block'
                    }}>
                        Active
                    </span>
                ) : (
                    <span style={{
                        color: '#EF4444',
                        backgroundColor: '#FEE2E2',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        display: 'inline-block'
                    }}>
                        Deactivated
                    </span>
                )}
            </div>
        );
    }
}
    

];

