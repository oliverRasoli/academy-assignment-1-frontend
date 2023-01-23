import { Space, Button } from 'antd';
import React from 'react';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';

const CardFloatButtons = () => {
  return (
    <Space direction="vertical">
      <Space wrap>
        <Button shape="circle" className="bg-custom-palette-baby-blue" icon={<EditOutlined />} />
        <Button shape="circle" className="bg-custom-palette-baby-blue" icon={<CloseOutlined />} />
      </Space>
    </Space>
  );
};

export default CardFloatButtons;
