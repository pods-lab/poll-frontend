import React, {PureComponent} from 'react';
import {Divider, TextField} from "@material-ui/core";

class Group extends PureComponent {
    render() {
        const {group, classes, onChangeInput} = this.props;
        return (
            <div className="w-full">
                {group.items.map((item, key) => (
                    <div className={`w-full md:flex items-center ${classes.item} mb-8`} key={`group-items-list-element-${group.code}-${key}`}>
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
                                    onClick={(e) => e.target.select() }
                                    value={item.value}
                                    type={"number"}
                                    onChange={(e) => onChangeInput(e, group.code, item.code)}
                                />
                            </div>
                        </div>
                        <Divider />
                    </div>
                ))}
            </div>
        );
    }
}

export default Group;