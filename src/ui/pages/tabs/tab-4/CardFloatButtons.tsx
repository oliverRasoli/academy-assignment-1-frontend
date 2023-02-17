import { Space, Button } from 'antd';
import React, { FC } from 'react';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';

type CardFloatButtonsProps = {
  onClickCallback: (param: string) => void;
};

const CardFloatButtons: FC<CardFloatButtonsProps> = ({ onClickCallback }) => {
  return (
    <Space direction="vertical" className="-mb-2">
      <Space wrap>
        <Button shape="circle" className="bg-custom-palette-baby-blue" icon={<EditOutlined />} />
        <Button shape="circle" onClick={() => onClickCallback('deleteClicked')} className="bg-custom-palette-baby-blue" icon={<CloseOutlined />} />
      </Space>
    </Space>
  );
};

export default CardFloatButtons;
