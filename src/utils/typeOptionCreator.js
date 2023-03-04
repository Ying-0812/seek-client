export function typeOptionCreator(Select, typeList){
    let optionContainer = [];
    for(let i=0;i<typeList.length;i++){
        optionContainer.push(
            <Select.Option
                value={typeList[i]._id}
                key={typeList[i]._id}
            >
                {typeList[i].typeName}
            </Select.Option>
        );
    }
    return optionContainer
}