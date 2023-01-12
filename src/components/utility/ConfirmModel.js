import classes from './ConfirmModel.module.css';
function ConfirmModel (props){
    function onCancel(){
        props.onCancel();
    }
    function onConfirm(){
        props.onConfirm();
    }
    const buttonClasses = classes.btn+' '+classes['btn--alt']
    return (
        <div className={classes.modal}>
            <p>Are you surethis todo delete?</p>
            <button className={buttonClasses} onClick={onCancel}>Cancel</button>
            <button className={classes.btn} onClick={onConfirm}>Confirm</button>
        </div>
    );

}
export default ConfirmModel;