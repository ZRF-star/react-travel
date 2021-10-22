import { Form, Input, Button, Checkbox } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from "../../redux/hooks";
import { signIn } from '../../redux/user/slice';

import styles from "./SignInForm.module.css";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const SignInForm = () => {

  const loading = useSelector(state => state.user.loading);
  const error = useSelector(state => state.user.error);
  const jwt = useSelector(state => state.user.token);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if(jwt !== null) {
      history.push("/");
    }
  }, [jwt])


  const onFinish = (values: any) => {
    console.log("Success:", values);
    dispatch(signIn({
      email:values.username,
      password:values.password,
    }))
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className={styles["register-form"]}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
