import { useEffect, useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    TextField,
    MenuItem,
    FormControlLabel,
    Switch
} from "@mui/material";

import PrimaryButton from "../common/PrimaryButton";

const initialState = {
    fullName: "",
    email: "",
    password: "",
    role: "MANAGER",
    active: true
};

const UserFormDialog = ({
    open,
    mode = "add",
    user,
    onClose,
    onSave,
    onSubmit
}) => {

    const [form, setForm] = useState(initialState);

    useEffect(() => {

        if (user) {

            setForm({
                fullName: user.fullName || "",
                email: user.email || "",
                password: "",
                role: user.role || "MANAGER",
                active: user.active ?? true
            });

        } else {

            setForm(initialState);

        }

    }, [user, open]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSwitch = (e) => {

        setForm(prev => ({
            ...prev,
            active: e.target.checked
        }));

    };

    const handleSubmit = () => {
        const saveFn = onSubmit || onSave;
        if (saveFn) {
            saveFn(form);
        }
    };

    const isEdit = !!user || mode === "edit";

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 4,
                        p: 1
                    }
                }
            }}
        >

            <DialogTitle
                sx={{
                    fontWeight: 700
                }}
            >

                {
                    isEdit
                        ? "Edit User"
                        : "Add User"
                }

            </DialogTitle>

            <DialogContent>

                <Grid
                    container
                    spacing={2}
                    mt={0.5}
                >

                    <Grid size={12}>

                        <TextField
                            fullWidth
                            label="Full Name"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid size={12}>

                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid size={12}>

                        <TextField
                            fullWidth
                            type="password"
                            label={
                                isEdit
                                    ? "New Password (Optional)"
                                    : "Password"
                            }
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid size={12}>

                        <TextField
                            select
                            fullWidth
                            label="Role"
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                        >

                            <MenuItem value="ADMIN">
                                Administrator
                            </MenuItem>

                            <MenuItem value="MANAGER">
                                Manager
                            </MenuItem>

                        </TextField>

                    </Grid>

                    <Grid size={12}>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={form.active}
                                    onChange={handleSwitch}
                                />
                            }
                            label="Active User"
                        />

                    </Grid>

                </Grid>

            </DialogContent>

            <DialogActions
                sx={{
                    px: 3,
                    pb: 2
                }}
            >

                <PrimaryButton
                    color="#6B7280"
                    onClick={onClose}
                >
                    Cancel
                </PrimaryButton>

                <PrimaryButton
                    onClick={handleSubmit}
                >

                    {
                        isEdit
                            ? "Update User"
                            : "Create User"
                    }

                </PrimaryButton>

            </DialogActions>

        </Dialog>

    );

};

export default UserFormDialog;