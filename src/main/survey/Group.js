import React, {PureComponent} from 'react';
import {
    Divider,
    TextField,
    Typography,
} from "@material-ui/core";

class Group extends PureComponent {
    render() {
        const {group, classes, onChangeInput} = this.props;
        return (
            <div className="w-full">
                {group.items.map((item, key) => (
                    <div className="w-full">
                        <div className={`w-full md:flex items-center`} key={`group-items-list-element-${group.code}-${key}`}>
                            <div className="w-full md:w-4/5 lg:w-full flex items-start py-4   ">
                            <span className={classes.nomenclature}>
                                {item.nomenclature}.
                            </span>
                                <div className={classes.itemText}>
                                    {item.title}
                                </div>
                            </div>
                            <div className="w-full md:w-1/5 flex justify-end h-full items-end">
                                <div>
                                    <TextField
                                        autoFocus={key === 0}
                                        onClick={(e) => e.target.select() }
                                        value={item.value}
                                        type={"number"}
                                        onChange={(e) => onChangeInput(e, group.code, item.code)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full pl-12 mb-4">
                            <Typography variant="caption">{item.description}</Typography>
                        </div>
                        <Divider />
                    </div>
                ))}
            </div>
        );
    }
}

export default Group;