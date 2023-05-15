import { FromInputLabel, Input, Group} from "./form-input.styles"

const FromInput = ({ label, ...otherProps }) => {
    return(
        <Group>
            <Input {...otherProps}/>
            {label && (
                <FromInputLabel shrink={otherProps.value.length}>{label}</FromInputLabel>
            )}
        </Group>
    )
}

export default FromInput;