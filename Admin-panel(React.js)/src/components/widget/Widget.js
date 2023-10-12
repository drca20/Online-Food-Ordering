import './widget.scss'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineOutlined from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const Widget = (props)=>{

    let data;
    //temp amt
    

    switch(props.type){
        case 'users':
            data={
                title:"USERS",
                isMoney:true,
                icon:<PersonOutlineOutlined />
            };
            break;

            case 'orders':
                data={
                    title:"ORDERS",
                    isMoney:true,
                    icon:<ShoppingCartIcon />
                };

                break;

                case 'earnings':
                data={
                    title:"EARNINGS",
                    isMoney:true,
                    icon:<ShoppingCartIcon />
                };

                break;
                default:
                    break;

    }


    return(
        <div className='widget'>
            <div className='left'>
                <span className='title'>
                    {data.title}
                </span>
                <span className='counter'> 
                {props.type === 'earnings'?(props.total*46)/100+"Rs":props.total}
                </span>
            </div>
            <div className='right'>
               
            </div>
        </div>
    )
}

export default Widget;